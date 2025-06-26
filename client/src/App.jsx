import React from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/common/Navbar';

const App = () => {
  const location = useLocation();
  const isDashboard = location.pathname.includes('dashboard');

  return (
    <>
      {!isDashboard && <Navbar />}
      <AppRoutes />
    </>
  );
};

export default App;
