import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar'; // Unified Navbar component
import MHabesha from './components/MHabesha';
import Account from './components/Account'; // Import the new Account component
import Dashboard from './components/Dashboard';
import MenPage from './components/MenProductList';
import WomenPage from './components/WomenProductList';
import MenProductDetails from './components/menProductDetails';
import WomenProductDetails from './components/WomenProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import "./index.css"

const App = () => {
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem('loggedIn') === 'true'; // Initialize from localStorage
  });

  const handleLogin = (status) => {
    setLoggedIn(status);
    localStorage.setItem('loggedIn', status); // Store login state in localStorage
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar loggedIn={loggedIn} setLoggedIn={handleLogin} /> {/* Pass to Navbar if needed */}
        <main>
          <Routes>
            <Route path="/" element={<MHabesha />} />
            <Route path="/account" element={<Account setLoggedIn={handleLogin} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/men" element={<MenPage />} />
            <Route path="/women" element={<WomenPage />} />
            <Route path="/menproduct/:id" element={<MenProductDetails />} />
            <Route path="/womenproduct/:id" element={<WomenProductDetails />} />
            <Route path="/cart" element={loggedIn ? <Cart /> : <Account setLoggedIn={handleLogin} />} />
            <Route path="/checkout" element={loggedIn ? <Checkout /> : <Account setLoggedIn={handleLogin} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;