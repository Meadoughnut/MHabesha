import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productsData from '../mock-data/menProducts.json';
import '../styles/productdetail.css';

const menProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const userEmail = localStorage.getItem('currentUser') || 'guest';

  useEffect(() => {
    const selectedProduct = productsData.find((item) => item.id === parseInt(id));
    setProduct(selectedProduct);

    const storedCart = JSON.parse(localStorage.getItem(`cartItems-${userEmail}`)) || [];
    setCartItems(storedCart);
  }, [id, userEmail]);

  const addToCart = () => {
    if (!product) {
      alert('Product not found.');
      return;
    }

    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);
    let updatedCart;

    if (existingItemIndex !== -1) {
      updatedCart = cartItems.map((item, index) =>
        index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    localStorage.setItem(`cartItems-${userEmail}`, JSON.stringify(updatedCart));
    alert(`${product.name} added to cart!`);
  };

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  const goBack = () => {
    navigate(-1);
  };

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="product-details">
      

      <div className="product-image-section">
        <img src={`/assets/images/mensimage/${product.image}`} alt={product.name} className="product-image" />
      </div>

      <div className="product-info-section">
        <h1>{product.name}</h1>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-description">{product.description}</p>

        <div className="button-container">
          <button onClick={addToCart} className="add-to-cart-button">Add to Cart</button>
          <button onClick={proceedToCheckout} className="checkout-button">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default menProductDetails;
