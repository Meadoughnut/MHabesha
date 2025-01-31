import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenProductsData from '../mock-data/menProducts.json'; // Import menProducts data
import '../styles/productlist.css';

const MenProductList = () => {
  const [menProducts, setMenProducts] = useState([]);
  const [cartItems, setCartItems] = useState({}); // To store cart items

  useEffect(() => {
    // Simulate fetching data
    setMenProducts(MenProductsData);
  }, []);

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
      {menProducts.map((product) => {
        // Ensure the image path is correct and images are stored in public/assets/images
        const imagePath = `./assets/images/mensimage/${product.image}`;

        return (
          <div className="product-card" key={product.id}>
            <div className="product-image-container">
              <img src={imagePath} alt={product.name} className="product-image" />
              <div className="product-overlay">
                <button onClick={() => addToCart(product)} className="add-to-cart-btn">Add to Cart</button>
                <Link to={`/menproduct/${product.id}`} className="view-details-btn">View Details</Link>
              </div>
            </div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MenProductList;