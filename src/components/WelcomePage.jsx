import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import toplogo from '../assets/logos/toplogo.png';
import '../styles/welcomepage.css';

const WelcomePage = ({ setLoggedIn, setIsGuest }) => {
  const navigate = useNavigate();

  // Handle the guest button click
  const handleGuestClick = () => {
    if (typeof setIsGuest === 'function' && typeof setLoggedIn === 'function') {
      setIsGuest(true); // Set guest mode to true
      setLoggedIn(false); // Ensure loggedIn is false in guest mode
      console.log('Guest mode activated. Navigating to products...');
      navigate('/products'); // Redirect to product list
    } else {
      console.error('setIsGuest or setLoggedIn is not a function. Check the props passed to WelcomePage.');
    }
  };

  return (
    <div className="welcome-page">
      

      {/* Welcome Content */}
      <h1>Discover Luxury.</h1>
      <p>
        Indulge in timeless collections for men and women, curated for those who value the finest in fashion. 
        Our exclusive designs are crafted with precision, ensuring every piece represents elegance and sophistication.
        From luxurious fabrics to exquisite craftsmanship, each item in our collection tells a story of heritage, beauty, 
        and innovation. 
      </p>
    </div>
  );
};

export default WelcomePage;
