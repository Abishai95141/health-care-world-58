
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { StaffAuthProvider } from "@/contexts/StaffAuthContext";
import { BannerProvider } from "@/contexts/BannerContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import StaffLogin from "./pages/staff/StaffLogin";
import StaffDashboard from "./pages/staff/StaffDashboard";
import ManageProducts from "./pages/staff/ManageProducts";
import AddProduct from "./pages/staff/AddProduct";
import EditProduct from "./pages/staff/EditProduct";
import BulkImport from "./pages/staff/BulkImport";
import InventoryAlerts from "./pages/staff/InventoryAlerts";
import BannerManagement from "./pages/staff/BannerManagement";
import SalesDashboard from "./pages/staff/SalesDashboard";
import InventoryDashboard from "./pages/staff/InventoryDashboard";
import CustomerDashboard from "./pages/staff/CustomerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import StaffProtectedRoute from "./components/staff/StaffProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppProvider>
            <AuthProvider>
              <StaffAuthProvider>
                <BannerProvider>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:slug" element={<ProductDetail />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactUs />} />
                    
                    {/* Protected Routes */}
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    <Route path="/cart" element={
                      <ProtectedRoute>
                        <CartPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/checkout" element={
                      <ProtectedRoute>
                        <CheckoutPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/order-confirmation/:orderId" element={
                      <ProtectedRoute>
                        <OrderConfirmation />
                      </ProtectedRoute>
                    } />

                    {/* Staff Routes */}
                    <Route path="/staff/login" element={<StaffLogin />} />
                    <Route path="/staff" element={
                      <StaffProtectedRoute>
                        <StaffDashboard />
                      </StaffProtectedRoute>
                    } />
                    <Route path="/staff/dashboard/sales" element={
                      <StaffProtectedRoute>
                        <SalesDashboard />
                      </StaffProtectedRoute>
                    } />
                    <Route path="/staff/dashboard/inventory" element={
                      <StaffProtectedRoute>
                        <InventoryDashboard />
                      </StaffProtectedRoute>
                    } />
                    <Route path="/staff/dashboard/customers" element={
                      <StaffProtectedRoute>
                        <CustomerDashboard />
                      </StaffProtectedRoute>
                    } />
                    <Route path="/staff/products" element={
                      <StaffProtectedRoute>
                        <ManageProducts />
                      </StaffProtectedRoute>
                    } />
                    <Route path="/staff/add-product" element={
                      <StaffProtectedRoute>
                        <AddProduct />
                      </StaffProtectedRoute>
                    } />
                    <Route path="/staff/edit-product/:id" element={
                      <StaffProtectedRoute>
                        <EditProduct />
                      </StaffProtectedRoute>
                    } />
                    <Route path="/staff/bulk-import" element={
                      <StaffProtectedRoute>
                        <BulkImport />
                      </StaffProtectedRoute>
                    } />
                    <Route path="/staff/inventory-alerts" element={
                      <StaffProtectedRoute>
                        <InventoryAlerts />
                      </StaffProtectedRoute>
                    } />
                    <Route path="/staff/banners" element={
                      <StaffProtectedRoute>
                        <BannerManagement />
                      </StaffProtectedRoute>
                    } />

                    {/* 404 Route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BannerProvider>
              </StaffAuthProvider>
            </AuthProvider>
          </AppProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
