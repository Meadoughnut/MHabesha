import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/mainnavbar.css'; // Updated CSS file

const MainNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="mainnavbar">
      <div className="mainnavbar-center">
        <p>Meadin Fashion</p>
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? '✖' : '☰'} {/* X icon when open, three dots when closed */}
        </div>
      </div>
      
      <div className={`mainnavbar-links ${menuOpen ? 'show' : ''}`}>
        <div className="mainnavbar-left">
          <Link to="/men">Men</Link>
          <Link to="/women">Women</Link>
          <Link to="/kaba">Kaba</Link>
        </div>

        <div className="mainnavbar-right">
          <Link to="/home">Home</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
