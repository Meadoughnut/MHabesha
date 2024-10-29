import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; // Unified CSS file for Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/men">Men</Link>
        <Link to="/women">Women</Link>
      </div>
      
      <div className="navbar-center">
        <p>MHabesha</p>
      </div>

      <div className="navbar-right">
        <Link to="/cart">🛒</Link> {/* Cart icon */}
        <Link to="/account">👤</Link> {/* Account icon */}
      </div>
    </nav>
  );
};

export default Navbar;
