import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { CartPage } from './pages/Cart';
import { CheckoutPage } from './pages/Checkout';
import { CategoryPage } from './pages/Category';
import { SearchPage } from './pages/Search';
import { LoginPage } from './pages/auth/Login';
import { RegisterPage } from './pages/auth/Register';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminProducts } from './pages/admin/Products';
import { ProductForm } from './pages/admin/ProductForm';
import { AdminUsers } from './pages/admin/Users';
import { AdminPromotions } from './pages/admin/Promotions';
import { AdminSettings } from './pages/admin/Settings';
import { HeroManager } from './pages/admin/HeroManager';
import { AdminReports } from './pages/admin/Reports';
import { UserLayout } from './pages/user/UserLayout';
import { UserDashboard } from './pages/user/Dashboard';
import { UserOrders } from './pages/user/Orders';
import { UserFavorites } from './pages/user/Favorites';
import { UserAddresses } from './pages/user/Addresses';
import { UserReviews } from './pages/user/Reviews';
import { UserSettings } from './pages/user/Settings';
import { ContactPage } from './pages/Contact';
import { AboutPage, ExchangePolicyPage, PrivacyPage } from './pages/institutional';
import { ScrollToTop } from './components/ScrollToTop';

// Layout padrão com Header e Footer
const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-blackCarbon font-sans text-gray-100 antialiased selection:bg-primary selection:text-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Rota Protegida
const ProtectedRoute: React.FC<{ role?: 'admin' | 'user', children: React.ReactNode }> = ({ role, children }) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen bg-blackCarbon flex items-center justify-center text-white">Carregando...</div>;
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && profile?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              
              {/* Static Pages */}
              <Route path="/contato" element={<ContactPage />} />
              <Route path="/institutional/sobre" element={<AboutPage />} />
              <Route path="/institutional/trocas" element={<ExchangePolicyPage />} />
              <Route path="/institutional/privacidade" element={<PrivacyPage />} />
            </Route>

            {/* User Account Routes */}
            <Route path="/minha-conta" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route element={<UserLayout />}>
                <Route index element={<UserDashboard />} />
                <Route path="pedidos" element={<UserOrders />} />
                <Route path="favoritos" element={<UserFavorites />} />
                <Route path="enderecos" element={<UserAddresses />} />
                <Route path="avaliacoes" element={<UserReviews />} />
                <Route path="configuracoes" element={<UserSettings />} />
              </Route>
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="hero" element={<HeroManager />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/new" element={<ProductForm />} />
              <Route path="products/:id" element={<ProductForm />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="promotions" element={<AdminPromotions />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
