import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/account.css';

const Account = ({ setLoggedIn }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    location: 'United States',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setMessage('');
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem(formData.email);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.password === formData.password) {
        setMessage('Sign in successful! Redirecting to dashboard...');
        setLoggedIn(true);
        localStorage.setItem('currentUser', formData.email);
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setMessage('Incorrect password. Please try again.');
      }
    } else {
      setMessage('User not found. Please sign up.');
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const existingUser = localStorage.getItem(formData.email);
    if (existingUser) {
      setMessage('User already exists. Please sign in.');
    } else {
      localStorage.setItem(formData.email, JSON.stringify(formData));
      setMessage('Sign up successful! Redirecting to dashboard...');
      setLoggedIn(true);
      setTimeout(() => navigate('/dashboard'), 1000);
    }
  };

  return (
    <div className="account-container">
      <h1>ACCOUNT</h1>
      <div className="tabs">
        <button className={isSignIn ? 'active' : ''} onClick={() => setIsSignIn(true)}>Sign In</button>
        <button className={!isSignIn ? 'active' : ''} onClick={() => setIsSignIn(false)}>Register</button>
      </div>

      <div className="form-container">
        {isSignIn ? (
          <form onSubmit={handleSignInSubmit}>
            <h2>WELCOME BACK.</h2>
            <p>Sign in with your email and password.</p>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
            <button type="submit" className="submit-button">Sign In</button>
          </form>
        ) : (
          <form onSubmit={handleSignUpSubmit}>
            <h2>Create an account</h2>
            <p>Create an account and benefit from a more personal shopping experience, and quicker online checkout.</p>
            <p>All fields are mandatory.</p>
            
            <label>Title</label>
            <select name="title" value={formData.title} onChange={handleInputChange} required>
              <option value="">Select</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="Ms">Ms</option>
            </select>

            <input type="text" name="firstName" placeholder="First name" value={formData.firstName} onChange={handleInputChange} required />
            <input type="text" name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleInputChange} required />
            
            <label>Location of residence</label>
            <select name="location" value={formData.location} onChange={handleInputChange} required>
              <option value="United States">United States</option>
              {/* Add more location options as needed */}
            </select>

            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
            <button type="submit" className="submit-button">Register</button>
          </form>
        )}
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Account;
