import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenProductsData from '../mock-data/menProducts.json'; // Import menProducts data
import MainNavBar from './MainNavbar';
import '../styles/productlist.css';

const MenProductList = () => {
  const [menProducts, setMenProducts] = useState([]);
  const [cartItems, setCartItems] = useState({}); // To store cart items with quantity

  useEffect(() => {
    // Simulate fetching data
    setMenProducts(MenProductsData);
  }, []);

  // Handle quantity changes for a product
  const handleQuantityChange = (id, increment) => {
    setCartItems((prevCartItems) => {
      const updatedQuantity = (prevCartItems[id]?.quantity || 0) + increment;
      if (updatedQuantity <= 0) {
        // Remove the item if quantity reaches 0 or less
        const { [id]: _, ...rest } = prevCartItems;
        return rest;
      }
      return {
        ...prevCartItems,
        [id]: {
          ...menProducts.find((product) => product.id === id),
          quantity: updatedQuantity,
        },
      };
    });
  };

  // Add to Cart functionality
  const addToCart = (product) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [product.id]: {
        ...product,
        quantity: (prevCartItems[product.id]?.quantity || 0) + 1,
      },
    }));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="product-grid">
      <MainNavBar />
      {menProducts.map((product) => {
        // Build the image path using the public folder path
        const imagePath = `/assets/images/mensimage/${product.image}`;
        const quantity = cartItems[product.id]?.quantity || 0;

        return (
          <div className="product-card" key={product.id}>
            <img src={imagePath} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>

            {/* Quantity Manager */}
            <div className="quantity-manager">
              <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
            </div>

            {/* Buttons Container */}
            <div className="button-container">
              <button onClick={() => addToCart(product)} className="add-to-cart-btn">Add to Cart</button>
              <Link to={`/menproduct/${product.id}`}>View Details</Link>


            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenProductList;
