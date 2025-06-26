import React from 'react';
import { useAuthStore } from '../../store/authStore';

const AdminDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="p-4">
      <h3 className="text-danger mb-3">Admin Dashboard</h3>
      <p>System overview for: {user?.name}</p>
      <ul>
        <li>Manage users</li>
        <li>Review property listings</li>
        <li>Monitor platform activity</li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
