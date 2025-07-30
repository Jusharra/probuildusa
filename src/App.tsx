import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import ServicePage from './pages/ServicePage';
import LeadIntake from './pages/LeadIntake';
import PartnerPortal from './pages/PartnerPortal';
import WhyPartner from './pages/WhyPartner';
import ContractorDirectory from './pages/ContractorDirectory';
import ContractorProfilePage from './pages/ContractorProfilePage';
import AdminPortal from './pages/AdminPortal';
import FinancingPage from './pages/FinancingPage';
import LoginPage from './pages/LoginPage';
import PasswordResetPage from './pages/PasswordResetPage';
import PricingPage from './pages/PricingPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import SuccessPage from './pages/SuccessPage';
import PavementMaintenanceGuidance from './pages/PavementMaintenanceGuidance';
import FAQs from './pages/FAQs';
import ParkingLotStripingGuide from './pages/ParkingLotStripingGuide';
import CancelPage from './pages/CancelPage';
import HowItWorksPage from './pages/HowItWorksPage';
import WhyChooseUsPage from './pages/WhyChooseUsPage';

// Protected Route Component
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  requiredRole?: 'admin' | 'professional';
  redirectTo?: string;
}> = ({ children, requiredRole, redirectTo = '/login' }) => {
  const { user, profile, isLoading } = useAuth();

  // Show nothing while loading to prevent flash
  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requiredRole && profile?.role !== requiredRole) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

// Role-based redirect component
const RoleBasedRedirect: React.FC = () => {
  const { user, profile, isLoading } = useAuth();

  // Show nothing while loading
  if (isLoading) {
    return null;
  }

  if (!user || !profile) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on role
  if (profile.role === 'admin') {
    return <Navigate to="/admin" replace />;
  } else if (profile.role === 'professional') {
    return <Navigate to="/partner-portal" replace />;
  }

  return <Navigate to="/" replace />;
};

// Public route wrapper that hides header/footer for login page
const PublicRoute: React.FC<{ children: React.ReactNode; hideLayout?: boolean }> = ({ 
  children, 
  hideLayout = false 
}) => {
  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

function AppContent() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicRoute><Homepage /></PublicRoute>} />
        <Route path="/services/:service" element={<PublicRoute><ServicePage /></PublicRoute>} />
        <Route path="/get-started" element={<PublicRoute><LeadIntake /></PublicRoute>} />
        <Route path="/why-partner" element={<PublicRoute><WhyPartner /></PublicRoute>} />
        <Route path="/contractors" element={<PublicRoute><ContractorDirectory /></PublicRoute>} />
        <Route path="/contractors/:slug" element={<PublicRoute><ContractorProfilePage /></PublicRoute>} />
        <Route path="/financing" element={<PublicRoute><FinancingPage /></PublicRoute>} />
        <Route path="/pavement-maintenance-guidance" element={<PublicRoute><PavementMaintenanceGuidance /></PublicRoute>} />
        <Route path="/faqs" element={<PublicRoute><FAQs /></PublicRoute>} />
        <Route path="/parking-lot-striping-guide" element={<PublicRoute><ParkingLotStripingGuide /></PublicRoute>} />
        <Route path="/pricing" element={<PublicRoute><PricingPage /></PublicRoute>} />
        <Route path="/how-it-works" element={<PublicRoute><HowItWorksPage /></PublicRoute>} />
        <Route path="/why-choose-us" element={<PublicRoute><WhyChooseUsPage /></PublicRoute>} />
        
        {/* Payment Routes */}
        <Route path="/success" element={<PublicRoute hideLayout><SuccessPage /></PublicRoute>} />
        <Route path="/cancel" element={<PublicRoute hideLayout><CancelPage /></PublicRoute>} />
        
        {/* Authentication Routes */}
        <Route path="/login" element={<PublicRoute hideLayout><LoginPage /></PublicRoute>} />
        <Route path="/reset-password" element={<PublicRoute hideLayout><PasswordResetPage /></PublicRoute>} />
        <Route path="/reset-password" element={<PublicRoute hideLayout><PasswordResetPage /></PublicRoute>} />
        
        {/* Role-based Dashboard Redirect */}
        <Route path="/dashboard" element={<RoleBasedRedirect />} />
        
        {/* Protected Routes - Professional Only */}
        <Route 
          path="/partner-portal" 
          element={
            <ProtectedRoute requiredRole="professional" redirectTo="/login">
              <PublicRoute><PartnerPortal /></PublicRoute>
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Routes - Admin Only */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin" redirectTo="/login">
              <PublicRoute><AdminPortal /></PublicRoute>
            </ProtectedRoute>
          } 
        />

        {/* Protected Routes - All Authenticated Users */}
        <Route 
          path="/profile-settings" 
          element={
            <ProtectedRoute redirectTo="/login">
              <PublicRoute><ProfileSettingsPage /></PublicRoute>
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;