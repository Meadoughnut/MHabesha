import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/authnavbar.css'; // AuthNavbar-specific CSS

const AuthNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="authnavbar">
      <div className="authnavbar-center">
        <p>Meadin Fashion</p>
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? '✖' : '☰'} {/* X icon when open, three dots when closed */}
        </div>
      </div>

      <div className={`authnavbar-links ${menuOpen ? 'show' : ''}`}>
        <div className="authnavbar-left">
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
         
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;
