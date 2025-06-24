
-- Update orders table to include payment_status
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending' 
CHECK (payment_status IN ('paid', 'pending', 'failed'));

-- Create cart_sessions table for cart abandonment tracking
CREATE TABLE IF NOT EXISTS cart_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'converted', 'abandoned')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  abandoned_at TIMESTAMP WITH TIME ZONE,
  converted_at TIMESTAMP WITH TIME ZONE
);

-- Create purchase_orders table for reorder automation
CREATE TABLE IF NOT EXISTS purchase_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  po_number TEXT UNIQUE NOT NULL,
  supplier TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'received', 'cancelled')),
  total_amount NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create purchase_order_items table
CREATE TABLE IF NOT EXISTS purchase_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_order_id UUID REFERENCES purchase_orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_cost NUMERIC NOT NULL,
  total_cost NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT DEFAULT 'My Wishlist',
  is_default BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create wishlist_items table
CREATE TABLE IF NOT EXISTS wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wishlist_id UUID REFERENCES wishlists(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(wishlist_id, product_id)
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Drop triggers if they exist and recreate them
DROP TRIGGER IF EXISTS update_cart_sessions_updated_at ON cart_sessions;
CREATE TRIGGER update_cart_sessions_updated_at
  BEFORE UPDATE ON cart_sessions
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS update_purchase_orders_updated_at ON purchase_orders;
CREATE TRIGGER update_purchase_orders_updated_at
  BEFORE UPDATE ON purchase_orders
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS update_wishlists_updated_at ON wishlists;
CREATE TRIGGER update_wishlists_updated_at
  BEFORE UPDATE ON wishlists
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS update_contact_messages_updated_at ON contact_messages;
CREATE TRIGGER update_contact_messages_updated_at
  BEFORE UPDATE ON contact_messages
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Create analytics views
CREATE OR REPLACE VIEW daily_sales AS
SELECT 
  DATE(created_at) as sale_date,
  COUNT(*) as total_orders,
  SUM(total_amount) as total_revenue,
  AVG(total_amount) as avg_order_value
FROM orders 
WHERE status = 'confirmed'
GROUP BY DATE(created_at)
ORDER BY sale_date DESC;

CREATE OR REPLACE VIEW payment_breakdown AS
SELECT 
  payment_status,
  COUNT(*) as order_count,
  SUM(total_amount) as total_amount
FROM orders 
GROUP BY payment_status;

CREATE OR REPLACE VIEW stock_values AS
SELECT 
  category,
  SUM(stock * price) as total_value,
  COUNT(*) as product_count
FROM products 
WHERE is_active = true
GROUP BY category;

CREATE OR REPLACE VIEW low_stock AS
SELECT id, name, category, stock, price
FROM products 
WHERE stock > 0 AND stock <= 10 AND is_active = true
ORDER BY stock ASC;

CREATE OR REPLACE VIEW out_of_stock AS
SELECT id, name, category, stock, price
FROM products 
WHERE stock = 0 AND is_active = true;

-- Create RPC functions for analytics
CREATE OR REPLACE FUNCTION get_top_products(limit_count INTEGER DEFAULT 10)
RETURNS TABLE(
  product_id UUID,
  product_name TEXT,
  total_quantity BIGINT,
  total_revenue NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    SUM(oi.quantity) as total_quantity,
    SUM(oi.total_price) as total_revenue
  FROM products p
  JOIN order_items oi ON p.id = oi.product_id
  JOIN orders o ON oi.order_id = o.id
  WHERE o.status = 'confirmed'
  GROUP BY p.id, p.name
  ORDER BY total_quantity DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_top_categories(limit_count INTEGER DEFAULT 10)
RETURNS TABLE(
  category TEXT,
  total_sales BIGINT,
  total_revenue NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.category,
    SUM(oi.quantity) as total_sales,
    SUM(oi.total_price) as total_revenue
  FROM products p
  JOIN order_items oi ON p.id = oi.product_id
  JOIN orders o ON oi.order_id = o.id
  WHERE o.status = 'confirmed'
  GROUP BY p.category
  ORDER BY total_sales DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_top_brands(limit_count INTEGER DEFAULT 10)
RETURNS TABLE(
  brand TEXT,
  total_sales BIGINT,
  total_revenue NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.brand,
    SUM(oi.quantity) as total_sales,
    SUM(oi.total_price) as total_revenue
  FROM products p
  JOIN order_items oi ON p.id = oi.product_id
  JOIN orders o ON oi.order_id = o.id
  WHERE o.status = 'confirmed' AND p.brand IS NOT NULL
  GROUP BY p.brand
  ORDER BY total_sales DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_expiring_soon(days_ahead INTEGER DEFAULT 30)
RETURNS TABLE(
  product_id UUID,
  product_name TEXT,
  expiration_date DATE,
  days_until_expiry INTEGER,
  stock INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.expiration_date,
    (p.expiration_date - CURRENT_DATE) as days_until_expiry,
    p.stock
  FROM products p
  WHERE p.expiration_date IS NOT NULL 
    AND p.expiration_date <= CURRENT_DATE + INTERVAL '30 days'
    AND p.is_active = true
  ORDER BY p.expiration_date ASC;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_customer_stats()
RETURNS TABLE(
  total_customers BIGINT,
  new_customers_this_month BIGINT,
  returning_customers BIGINT,
  avg_orders_per_customer NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(DISTINCT o.user_id) as total_customers,
    COUNT(DISTINCT CASE 
      WHEN DATE_TRUNC('month', p.created_at) = DATE_TRUNC('month', CURRENT_DATE) 
      THEN o.user_id 
    END) as new_customers_this_month,
    COUNT(DISTINCT CASE 
      WHEN customer_order_count.order_count > 1 
      THEN o.user_id 
    END) as returning_customers,
    AVG(customer_order_count.order_count) as avg_orders_per_customer
  FROM orders o
  LEFT JOIN profiles p ON o.user_id = p.id
  LEFT JOIN (
    SELECT user_id, COUNT(*) as order_count
    FROM orders
    WHERE status = 'confirmed'
    GROUP BY user_id
  ) customer_order_count ON o.user_id = customer_order_count.user_id
  WHERE o.status = 'confirmed';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_cart_abandonment()
RETURNS TABLE(
  session_id TEXT,
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE,
  abandoned_at TIMESTAMP WITH TIME ZONE,
  items_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cs.session_id,
    cs.user_id,
    cs.created_at,
    cs.abandoned_at,
    COUNT(ci.id) as items_count
  FROM cart_sessions cs
  LEFT JOIN cart_items ci ON cs.user_id = ci.user_id
  WHERE cs.status = 'abandoned'
  GROUP BY cs.session_id, cs.user_id, cs.created_at, cs.abandoned_at
  ORDER BY cs.abandoned_at DESC;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_top_rated(limit_count INTEGER DEFAULT 10)
RETURNS TABLE(
  product_id UUID,
  product_name TEXT,
  avg_rating NUMERIC,
  review_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    AVG(pr.rating::NUMERIC) as avg_rating,
    COUNT(pr.id) as review_count
  FROM products p
  JOIN product_reviews pr ON p.id = pr.product_id
  GROUP BY p.id, p.name
  HAVING COUNT(pr.id) >= 3
  ORDER BY avg_rating DESC, review_count DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_lowest_rated(limit_count INTEGER DEFAULT 10)
RETURNS TABLE(
  product_id UUID,
  product_name TEXT,
  avg_rating NUMERIC,
  review_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    AVG(pr.rating::NUMERIC) as avg_rating,
    COUNT(pr.id) as review_count
  FROM products p
  JOIN product_reviews pr ON p.id = pr.product_id
  GROUP BY p.id, p.name
  HAVING COUNT(pr.id) >= 3
  ORDER BY avg_rating ASC, review_count DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION recent_reviews(limit_count INTEGER DEFAULT 20)
RETURNS TABLE(
  review_id UUID,
  product_name TEXT,
  reviewer_name TEXT,
  rating INTEGER,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pr.id,
    p.name,
    pr.reviewer_name,
    pr.rating,
    pr.comment,
    pr.created_at
  FROM product_reviews pr
  JOIN products p ON pr.product_id = p.id
  ORDER BY pr.created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Function to mark abandoned carts (to be called by cron job)
CREATE OR REPLACE FUNCTION mark_abandoned_carts()
RETURNS INTEGER AS $$
DECLARE
  updated_count INTEGER;
BEGIN
  UPDATE cart_sessions 
  SET 
    status = 'abandoned',
    abandoned_at = now()
  WHERE 
    status = 'active' 
    AND updated_at < (now() - INTERVAL '2 hours');
    
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RETURN updated_count;
END;
$$ LANGUAGE plpgsql;

-- Create sequence for purchase orders
CREATE SEQUENCE IF NOT EXISTS purchase_order_seq START 1;

-- Function to generate purchase orders for low stock items
CREATE OR REPLACE FUNCTION generate_purchase_order()
RETURNS UUID AS $$
DECLARE
  new_po_id UUID;
  po_number TEXT;
  low_stock_item RECORD;
  total_cost NUMERIC := 0;
BEGIN
  -- Generate PO number
  po_number := 'PO-' || TO_CHAR(now(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('purchase_order_seq')::TEXT, 4, '0');
  
  -- Create purchase order
  INSERT INTO purchase_orders (po_number, status)
  VALUES (po_number, 'pending')
  RETURNING id INTO new_po_id;
  
  -- Add items for products with low stock
  FOR low_stock_item IN 
    SELECT id, name, stock, price FROM products 
    WHERE stock <= 10 AND is_active = true
  LOOP
    INSERT INTO purchase_order_items (
      purchase_order_id, 
      product_id, 
      quantity, 
      unit_cost, 
      total_cost
    ) VALUES (
      new_po_id,
      low_stock_item.id,
      GREATEST(50 - low_stock_item.stock, 10), -- Order enough to reach 50 units
      low_stock_item.price * 0.6, -- Assume 40% markup
      (GREATEST(50 - low_stock_item.stock, 10)) * (low_stock_item.price * 0.6)
    );
    
    total_cost := total_cost + ((GREATEST(50 - low_stock_item.stock, 10)) * (low_stock_item.price * 0.6));
  END LOOP;
  
  -- Update total amount
  UPDATE purchase_orders 
  SET total_amount = total_cost 
  WHERE id = new_po_id;
  
  RETURN new_po_id;
END;
$$ LANGUAGE plpgsql;
