import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { StaffAuthProvider, StaffProtectedRoute } from '@/contexts/StaffAuthContext';
import { AppProvider } from '@/contexts/AppContext';
import { BannerProvider } from '@/contexts/BannerContext';
import { QueryProvider } from '@/contexts/QueryContext';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import ProductPage from '@/pages/ProductPage';
import CartPage from '@/components/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import OrderConfirmationPage from '@/pages/OrderConfirmationPage';
import ContactPage from '@/pages/ContactPage';
import AuthPage from '@/pages/AuthPage';
import ProfilePage from '@/pages/ProfilePage';
import StaffLayout from '@/components/staff/StaffLayout';
import StaffDashboard from '@/pages/staff/StaffDashboard';
import ManageProducts from '@/pages/staff/ManageProducts';
import AddProduct from '@/pages/staff/AddProduct';
import EditProduct from '@/pages/staff/EditProduct';
import ManageOrders from '@/pages/staff/ManageOrders';
import InventoryAlerts from '@/pages/staff/InventoryAlerts';
import BulkImport from '@/pages/staff/BulkImport';
import AdvertisementManagement from '@/pages/staff/AdvertisementManagement';
import BannerManagement from '@/pages/staff/BannerManagement';
import ManagePurchaseOrders from '@/pages/staff/ManagePurchaseOrders';
import NewPurchaseOrder from '@/pages/staff/NewPurchaseOrder';
import AnalyticsDashboard from '@/pages/staff/AnalyticsDashboard';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <AuthProvider>
        <StaffAuthProvider>
          <AppProvider>
            <BannerProvider>
              <QueryProvider>
                <Toaster />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:slug" element={<ProductPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  
                  {/* Staff Routes */}
                  <Route
                    path="/staff"
                    element={
                      <StaffProtectedRoute>
                        <StaffLayout />
                      </StaffProtectedRoute>
                    }
                  >
                    <Route index element={<StaffDashboard />} />
                    <Route path="analytics" element={<AnalyticsDashboard />} />
                    <Route path="products" element={<ManageProducts />} />
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="edit-product/:id" element={<EditProduct />} />
                    <Route path="orders" element={<ManageOrders />} />
                    <Route path="inventory-alerts" element={<InventoryAlerts />} />
                    <Route path="bulk-import" element={<BulkImport />} />
                    <Route path="advertisements" element={<AdvertisementManagement />} />
                    <Route path="banners" element={<BannerManagement />} />
                    <Route path="purchase-orders" element={<ManagePurchaseOrders />} />
                    <Route path="purchase-orders/new" element={<NewPurchaseOrder />} />
                  </Route>
                </Routes>
              </QueryProvider>
            </BannerProvider>
          </AppProvider>
        </StaffAuthProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
