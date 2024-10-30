import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [userName, setUserName] = useState('User'); // Store the user's name
  const [cartCount, setCartCount] = useState(0); // Store the cart count

  useEffect(() => {
    // Fetch user's name from localStorage
    const currentUser = localStorage.getItem('currentUser');
    const userData = JSON.parse(localStorage.getItem(currentUser));
    setUserName(userData?.firstName || 'User');

    // Retrieve cart items for the user and update cart count
    const cartItems = JSON.parse(localStorage.getItem(`cartItems-${currentUser}`)) || [];
    setCartCount(cartItems.length);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h1>WELCOME {userName.toUpperCase()}</h1>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="section"> {/* Repeat sections as needed */}</div>
      </div>

      {/* Cart Info */}
      <div className="cart-info">
        <Link to="/cart">
          <span>🛒 Cart: {cartCount} items</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
