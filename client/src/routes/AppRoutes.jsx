
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../components/landing/LandingPage';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    {/* Add more routes here */}
  </Routes>
);

export default AppRoutes;
