import React from "react";

const ProductsList = ({ products, addToCart, removeFromCart, quantities }) => {
    return (
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <p className="category">{product.category}</p>
            <h2 className="description">{product.title}</h2>
            <div className="Price_Cart">
              <p className="price">${product.price}</p>
              {quantities[product.id] ? (
                <div className="quantity-controls">
                  <button onClick={() => removeFromCart(product.id)}>-</button>
                  <span>{quantities[product.id]}</span>
                  <button onClick={() => addToCart(product)}>+</button>
                </div>
              ) : (
                <button className="add-to-cart" onClick={() => addToCart(product)}>
                  Add to cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ProductsList;
  