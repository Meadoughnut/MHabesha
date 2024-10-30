import React, { useState, useEffect } from 'react';
import '../styles/checkout.css';

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    state: '',
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    phoneNumber: '',
  });

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
    const price = storedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(price);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
  };

  return (
    <div className="checkout">
      <h1>CHECKOUT</h1>

      {/* Account Section */}
      <section>
        <h2>1. ACCOUNT</h2>
        <p>Welcome, Meadin</p>
      </section>

      {/* Delivery Method Section */}
      <section>
        <h2>2. DELIVERY METHOD</h2>
        <p>We only ship to addresses within the United States.</p>
        <div className="delivery-form">
          <input type="text" name="firstName" placeholder="First name" onChange={handleInputChange} required />
          <input type="text" name="lastName" placeholder="Last name" onChange={handleInputChange} required />
          <input type="text" name="address" placeholder="Address" onChange={handleInputChange} required />
          <input type="text" name="city" placeholder="City" onChange={handleInputChange} required />
          <input type="text" name="state" placeholder="State" onChange={handleInputChange} required />
          <input type="text" name="zip" placeholder="Zip code" onChange={handleInputChange} required />
        </div>
      </section>

      {/* Order Summary Section */}
      <section className="order-summary">
        <h2>Order Summary</h2>
        {cartItems.map(item => (
          <div key={item.id} className="summary-item">
            <p>{item.name} - QTY {item.quantity}</p>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <p>Subtotal: ${totalPrice.toFixed(2)}</p>
        <p>Taxes: $8.60</p>
        <p>Delivery method: Complimentary</p>
        <p>Total: ${(totalPrice + 8.6).toFixed(2)}</p>
      </section>

      {/* Billing Section */}
      <section>
        <h2>3. BILLING</h2>
        <form onSubmit={handlePlaceOrder}>
          <div className="payment-method">
            <button type="button">Payment Cards</button>
            <button type="button">PayPal</button>
          </div>
          <input type="text" name="cardName" placeholder="Name on card" onChange={handleInputChange} required />
          <input type="text" name="cardNumber" placeholder="Card number" onChange={handleInputChange} required />
          <div className="expiry-cvv">
            <input type="text" name="expiryMonth" placeholder="MM" maxLength="2" onChange={handleInputChange} required />
            <input type="text" name="expiryYear" placeholder="YY" maxLength="2" onChange={handleInputChange} required />
            <input type="text" name="cvv" placeholder="CVV" maxLength="3" onChange={handleInputChange} required />
          </div>
          <input type="tel" name="phoneNumber" placeholder="Phone Number" onChange={handleInputChange} required />
          <button type="submit" className="place-order-button">PLACE ORDER</button>
        </form>
      </section>
    </div>
  );
};

export default Checkout;
