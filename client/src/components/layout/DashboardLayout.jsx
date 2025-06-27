import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DashboardLayout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        {/* 👇 this renders the nested route */}
        <main className="p-4 bg-light min-vh-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;