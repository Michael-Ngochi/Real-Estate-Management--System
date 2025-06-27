import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
  LayoutDashboard, Heart, MessageSquare, Calendar, Bell, User, LogOut, MapPin
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const navItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard Home' },
    { to: '/dashboard/properties', icon: <MapPin size={18} />, label: 'Properties' },
    { to: '/dashboard/notifications', icon: <Bell size={18} />, label: 'Notifications' },
    ...(user?.role === 'client'
      ? [
          { to: '/dashboard/saved', icon: <Heart size={18} />, label: 'Saved Properties' },
          { to: '/dashboard/inquiries', icon: <MessageSquare size={18} />, label: 'My Inquiries' },
          { to: '/dashboard/applications', icon: <Calendar size={18} />, label: 'Applications' },
        ]
      : []),
    { to: '/dashboard/profile', icon: <User size={18} />, label: 'Profile' },
  ];

  return (
    <div
      className="d-flex flex-column bg-white shadow-sm p-3"
      style={{ width: '250px', minHeight: '100vh' }}
    >
      <h5 className="text-success fw-bold mb-4">NyumbaSmart</h5>
      <ul className="nav flex-column">
        {navItems.map(item => (
          <li key={item.to} className="nav-item mb-2">
            <Link
              to={item.to}
              className={`nav-link d-flex align-items-center ${
                location.pathname.startsWith(item.to) ? 'active fw-bold' : 'text-dark'
              }`}
            >
              {item.icon}
              <span className="ms-2">{item.label}</span>
            </Link>
          </li>
        ))}

        <li className="nav-item mt-3">
          <button
            className="btn btn-outline-danger w-100 d-flex align-items-center"
            onClick={logout}
          >
            <LogOut size={18} />
            <span className="ms-2">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
