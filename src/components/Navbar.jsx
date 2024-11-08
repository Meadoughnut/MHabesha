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
      <Link to="/">MHabesha</Link>
      </div>

      <div className="navbar-right">
        <Link to="/cart"><img width="32" height="32" src="https://img.icons8.com/small/32/bag-front-view.png" alt="bag-front-view"/></Link> {/* Cart icon */}
        <Link to="/account"><img width="32" height="32" src="https://img.icons8.com/windows/32/user-male-circle.png" alt="user-male-circle"/></Link> {/* Account icon */}
      </div>
    </nav>
  );
};

export default Navbar;
