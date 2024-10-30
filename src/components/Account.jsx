import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/account.css';

const Account = ({ setLoggedIn }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    isSignIn
      ? setFormData({ ...formData, [name]: value })
      : setUser({ ...user, [name]: value });
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem(formData.email);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.password === formData.password) {
        setMessage('Sign in successful! Redirecting to homepage...');
        setLoggedIn(true);
        localStorage.setItem('currentUser', formData.email);
        setTimeout(() => navigate('/home'), 1000);
      } else {
        setMessage('Incorrect password. Please try again.');
      }
    } else {
      setMessage('User not found. Please sign up.');
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const existingUser = localStorage.getItem(user.email);
    if (existingUser) {
      setMessage('User already exists. Please sign in.');
    } else {
      localStorage.setItem(user.email, JSON.stringify(user));
      setMessage('Sign up successful! Redirecting to the product page...');
      setTimeout(() => navigate('/home'), 1000);
    }
  };

  return (
    <div className="account-container">
      <h1>CHANEL ACCOUNT</h1>
      <div className="tabs">
        <button className={isSignIn ? 'active' : ''} onClick={() => setIsSignIn(true)}>Sign In</button>
        <button className={!isSignIn ? 'active' : ''} onClick={() => setIsSignIn(false)}>Register</button>
      </div>
      <div className="form-container">
        {isSignIn ? (
          <form onSubmit={handleSignInSubmit}>
            <h2>WELCOME BACK.</h2>
            <p>Sign in with your email and password.</p>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <a href="#" className="forgot-password">Forgot password?</a>
            <div className="checkbox-container">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me (optional)</label>
            </div>
            <button type="submit" className="submit-button">Sign In</button>
          </form>
        ) : (
          <form onSubmit={handleSignUpSubmit}>
            <h2>CREATE AN ACCOUNT</h2>
            <p>Sign up with your email and password.</p>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={user.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="submit-button">Register</button>
          </form>
        )}
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Account;
