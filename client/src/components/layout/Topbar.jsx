import React from 'react';
import { Bell } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Topbar = () => {
  const { user } = useAuthStore();

  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-white border-bottom">
      <div className="fw-bold text-success">
        {user?.role && (
          <span className="badge bg-light text-success border me-2 text-uppercase">{user.role}</span>
        )}
        Welcome, {user?.name}
      </div>
      <div className="d-flex align-items-center gap-3">
        <Bell />
        <div className="rounded-circle bg-success text-white d-flex justify-content-center align-items-center" style={{ width: '36px', height: '36px' }}>
          {user?.name?.charAt(0)}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
