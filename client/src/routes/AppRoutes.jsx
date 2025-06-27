import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../components/landing/LandingPage';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import ProtectedRoute from '../components/ProtectedRoute';
import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardRouter from '../components/dashboards/DashboardRouter';
import AllProperties from '../components/common/AllProperties';
import PropertyDetails from '../components/common/PropertyDetails';
import AddPropertyForm from '../components/properties/AddPropertyForm';
import EditPropertyForm from '../components/properties/EditPropertyForm';
// import other components as needed

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/properties/:id" element={<PropertyDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard index = role-specific home */}
        <Route index element={<DashboardRouter />} />
        <Route
        path="properties/new"
        element={<ProtectedRoute role="agent"><AddPropertyForm /></ProtectedRoute>}
        />
        <Route
          path="properties/edit/:id"
          element={<ProtectedRoute role="agent"><EditPropertyForm /></ProtectedRoute>}
        />
          {/* Sidebar-linked sub-pages */}
        <Route path="properties" element={<AllProperties />} />
        <Route path="properties/:id" element={<PropertyDetails />} />
        {/* <Route path="saved" element={<SavedProperties />} /> */}
        {/* <Route path="inquiries" element={<ClientInquiries />} /> */}
        {/* <Route path="applications" element={<ClientApplications />} /> */}
        {/* <Route path="notifications" element={<NotificationsPage />} /> */}
        {/* <Route path="profile" element={<UserProfile />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
