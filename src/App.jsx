import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar'; // Unified Navbar component
import WelcomePage from './components/WelcomePage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
// import Home from './components/Home';
import MenPage from './components/MenProductList';
import WomenPage from './components/WomenProductList';
import MenProductDetails from './components/MenProductDetails';
import WomenProductDetails from './components/WomenProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <div className="app-container">
        {/* Render the single Navbar component */}
        <Navbar />

        <Routes>
          {/* Set WelcomePage as the default route ("/") */}
          <Route path="/" element={<WelcomePage />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn setLoggedIn={setLoggedIn} />} />
          <Route path="/men" element={<MenPage />} />
          <Route path="/women" element={<WomenPage />} />
          <Route path="/menproduct/:id" element={<MenProductDetails />} />
          <Route path="/womenproduct/:id" element={<WomenProductDetails />} />
          <Route path="/cart" element={loggedIn ? <Cart /> : <SignIn setLoggedIn={setLoggedIn} />} />
          <Route path="/checkout" element={loggedIn ? <Checkout /> : <SignIn setLoggedIn={setLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
