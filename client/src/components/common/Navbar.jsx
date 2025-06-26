import logo from '../../assets/logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div className="container">
      <Link className="navbar-brand text-success fw-bold" to="/"><img src={logo}/> NyumbaSmart</Link>
      <div>
        <Link to="/login" className="btn btn-outline-success me-2">Log In</Link>
        <Link to="/register" className="btn btn-success">Get Started</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
