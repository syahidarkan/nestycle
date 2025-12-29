import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PointsProvider } from './contexts/PointsContext';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoadingScreen from './components/shared/LoadingScreen';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

// Customer Pages
import CustomerDashboard from './pages/customer/CustomerDashboard';
import Profile from './pages/customer/Profile';
import History from './pages/customer/History';
import Redeem from './pages/customer/Redeem';
import Checkout from './pages/customer/Checkout';
import Orders from './pages/customer/Orders';

// Mitra Pages
import MitraDashboard from './pages/mitra/MitraDashboard';
import Scan from './pages/mitra/Scan';
import Collections from './pages/mitra/Collections';
import Earnings from './pages/mitra/Earnings';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading screen for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthProvider>
      <PointsProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Customer Routes */}
              <Route
                path="/customer/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <Layout>
                      <CustomerDashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/profile"
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <Layout>
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/history"
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <Layout>
                      <History />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/redeem"
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <Layout>
                      <Redeem />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/checkout"
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <Layout>
                      <Checkout />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer/orders"
                element={
                  <ProtectedRoute allowedRoles={['customer']}>
                    <Layout>
                      <Orders />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              {/* Mitra Routes */}
              <Route
                path="/mitra/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['mitra']}>
                    <Layout>
                      <MitraDashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mitra/profile"
                element={
                  <ProtectedRoute allowedRoles={['mitra']}>
                    <Layout>
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mitra/scan"
                element={
                  <ProtectedRoute allowedRoles={['mitra']}>
                    <Layout>
                      <Scan />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mitra/collections"
                element={
                  <ProtectedRoute allowedRoles={['mitra']}>
                    <Layout>
                      <Collections />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mitra/earnings"
                element={
                  <ProtectedRoute allowedRoles={['mitra']}>
                    <Layout>
                      <Earnings />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              {/* Catch all - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </CartProvider>
      </PointsProvider>
    </AuthProvider>
  );
};

export default App;
