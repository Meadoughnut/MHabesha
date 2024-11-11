// Cart.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../styles/cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    const cartKey = `cartItems-${currentUser ? currentUser : 'guest'}`;
    const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    setCartItems(storedCart);

    // Calculate total
    const cartTotal = storedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(cartTotal);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);

    const currentUser = localStorage.getItem('currentUser');
    const cartKey = `cartItems-${currentUser ? currentUser : 'guest'}`;
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    updateTotal(updatedCart);
  };

  const updateTotal = (updatedCart) => {
    const newTotal = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal);
  };

  // Handle navigation to Checkout page
  const goToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">SHOPPING BAG</h1>
      <p className="cart-subtitle">Your items are presented in signature packaging.</p>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>QTY {item.quantity}</p>
              <div className="item-options">
                <button className="option-link" onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            </div>
            <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))
      )}

      <div className="cart-summary">
        <div className="summary-line">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="summary-line">
          <span>Taxes*</span>
          <p className="info-link">$0.00</p>
        </div>
        <div className="summary-line">
          <span>Delivery Method</span>
          <span>Complimentary</span>
        </div>
        <div className="summary-line total-line">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="checkout-section">
        <button onClick={goToCheckout} className="checkout-button">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
