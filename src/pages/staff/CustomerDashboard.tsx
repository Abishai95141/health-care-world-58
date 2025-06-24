
import React from 'react';
import { Helmet } from 'react-helmet';
import StaffLayout from '@/components/staff/StaffLayout';
import KPICard from '@/components/dashboard/KPICard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useCustomerData } from '@/hooks/useDashboardData';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  Star,
  ShoppingCartIcon
} from 'lucide-react';

const CustomerDashboard = () => {
  const { 
    customerKPIs, 
    topRatedProducts, 
    lowestRatedProducts, 
    recentReviews, 
    cartAbandonmentData, 
    loading 
  } = useCustomerData();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <>
      <Helmet>
        <title>Customer Dashboard - Staff Portal</title>
      </Helmet>
      <StaffLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customer Dashboard</h1>
            <p className="text-muted-foreground">
              Analyze customer behavior and satisfaction metrics
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <KPICard
              title="Total Customers"
              value={customerKPIs.totalCustomers}
              icon={Users}
            />
            <KPICard
              title="New Customers"
              value={customerKPIs.newCustomers}
              icon={UserPlus}
            />
            <KPICard
              title="Returning Customers"
              value={customerKPIs.returningCustomers}
              icon={UserCheck}
            />
            <KPICard
              title="Average Rating"
              value={customerKPIs.avgRating.toFixed(1)}
              icon={Star}
            />
            <KPICard
              title="Cart Abandonment Rate"
              value={customerKPIs.cartAbandonmentRate.toFixed(1)}
              icon={ShoppingCartIcon}
              format="percentage"
            />
          </div>

          {/* Reviews and Ratings */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Top Rated Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Rated Products</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Reviews</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topRatedProducts.slice(0, 5).map((product, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{product.product_name}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              {renderStars(Math.round(product.avg_rating))}
                              <span className="text-sm text-muted-foreground ml-2">
                                {product.avg_rating.toFixed(1)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{product.review_count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Lowest Rated Products */}
            <Card>
              <CardHeader>
                <CardTitle>Lowest Rated Products</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-[200px] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Reviews</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lowestRatedProducts.slice(0, 5).map((product, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{product.product_name}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              {renderStars(Math.round(product.avg_rating))}
                              <span className="text-sm text-muted-foreground ml-2">
                                {product.avg_rating.toFixed(1)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{product.review_count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-[200px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Reviewer</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Comment</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentReviews.slice(0, 10).map((review, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{review.product_name}</TableCell>
                        <TableCell>{review.reviewer_name}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            {renderStars(review.rating)}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {review.comment || 'No comment'}
                        </TableCell>
                        <TableCell>
                          {new Date(review.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Cart Abandonment */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Cart Abandonment</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-[200px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : cartAbandonmentData.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No abandoned carts found</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Session</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Abandoned</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartAbandonmentData.slice(0, 10).map((session, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{session.session_id}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{session.items_count} items</Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(session.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(session.abandoned_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </StaffLayout>
    </>
  );
};

export default CustomerDashboard;
