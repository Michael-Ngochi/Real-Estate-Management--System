import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from '../components/landing/LandingPage';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import ClientDashboard from '../components/dashboards/ClientDashboard';
import AgentDashboard from '../components/dashboards/AgentDashboard';
import AdminDashboard from '../components/dashboards/AdminDashboard';
import ProtectedRoute from '../components/ProtectedRoute';

// Placeholder pages 
// import SavedProperties from '../components/client/SavedProperties';
// import ClientInquiries from '../components/client/ClientInquiries';
// import ClientApplications from '../components/client/ClientApplications';
// import AllProperties from '../components/shared/AllProperties';
// import NotificationsPage from '../components/shared/NotificationsPage';
// import UserProfile from '../components/shared/UserProfile';

const AppRoutes = () => {
  const location = useLocation();
  const isDashboard = location.pathname.includes('dashboard');

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboards */}
      <Route
        path="/client-dashboard"
        element={<ProtectedRoute role="client"><ClientDashboard /></ProtectedRoute>}
      />
      <Route
        path="/agent-dashboard"
        element={<ProtectedRoute role="agent"><AgentDashboard /></ProtectedRoute>}
      />
      <Route
        path="/admin-dashboard"
        element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}
      />

      {/* Sidebar Routes */}
      {/* <Route
        path="/saved"
        element={<ProtectedRoute role="client"><SavedProperties /></ProtectedRoute>}
      /> */}
      {/* <Route
        path="/inquiries"
        element={<ProtectedRoute role="client"><ClientInquiries /></ProtectedRoute>}
      /> */}
      {/* <Route
        path="/applications"
        element={<ProtectedRoute role="client"><ClientApplications /></ProtectedRoute>}
      /> */}
      {/* <Route
        path="/properties"
        element={<ProtectedRoute><AllProperties /></ProtectedRoute>}
      /> */}
      {/* <Route
        path="/notifications"
        element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>}
      /> */}
      {/* <Route
        path="/profile"
        element={<ProtectedRoute><UserProfile /></ProtectedRoute>}
      /> */}
    </Routes>
  );
};

export default AppRoutes;
