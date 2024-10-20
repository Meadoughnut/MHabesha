import React, { useState, useEffect } from 'react';
import '../styles/checkout.css';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentCardNumber: '',
    paymentExpiry: '',
    paymentCVV: '',
  });

  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.paymentCardNumber) newErrors.paymentCardNumber = 'Card number is required';
    if (!formData.paymentExpiry) newErrors.paymentExpiry = 'Expiry date is required';
    if (!formData.paymentCVV) newErrors.paymentCVV = 'CVV is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log('Order details:', formData);
      localStorage.removeItem('cartItems');
      setOrderPlaced(true);
      setLoading(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Processing your order...</p>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="order-confirmation">
        <h1>Thank you for your order!</h1>
        <p>Your order has been placed successfully. We will ship your items soon.</p>
      </div>
    );
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <h2>Order Summary</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="order-summary">
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.name} (x{item.quantity}) - ${item.price.toFixed(2)}</p>
            </div>
          ))}
          <p><strong>Total: ${totalPrice.toFixed(2)}</strong></p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            placeholder="John Doe"
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            autoComplete="street-address"
            placeholder="123 Main St, Apt 4B"
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>
        <div>
          <label>Card Number</label>
          <input
            type="text"
            name="paymentCardNumber"
            value={formData.paymentCardNumber}
            onChange={handleChange}
            required
            autoComplete="cc-number"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
          {errors.paymentCardNumber && <p className="error">{errors.paymentCardNumber}</p>}
        </div>
        <div>
          <label>Expiry Date</label>
          <input
            type="text"
            name="paymentExpiry"
            value={formData.paymentExpiry}
            onChange={handleChange}
            required
            autoComplete="cc-exp"
            placeholder="MM/YY"
            maxLength={5}
          />
          {errors.paymentExpiry && <p className="error">{errors.paymentExpiry}</p>}
        </div>
        <div>
          <label>CVV</label>
          <input
            type="password"
            name="paymentCVV"
            value={formData.paymentCVV}
            onChange={handleChange}
            required
            autoComplete="cc-csc"
            placeholder="123"
            maxLength={3}
          />
          {errors.paymentCVV && <p className="error">{errors.paymentCVV}</p>}
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
