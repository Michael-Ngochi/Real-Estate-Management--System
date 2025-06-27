import React from 'react';
import { useAuthStore } from '../../store/authStore';
import ClientDashboard from './ClientDashboard';
import AgentDashboard from './AgentDashboard';
import AdminDashboard from './AdminDashboard';

const DashboardRouter = () => {
  const { user } = useAuthStore();

  if (user?.role === 'client') return <ClientDashboard />;
  if (user?.role === 'agent') return <AgentDashboard />;
  if (user?.role === 'admin') return <AdminDashboard />;
  return <p>Invalid role</p>;
};

export default DashboardRouter;
