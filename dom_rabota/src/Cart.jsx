import React from "react";

const Cart = ({ cart, addToCart, removeFromCart, quantities }) => {
  return (
    <div className="cart">
      <h2 className="cart-title">Cart</h2>
      {Object.keys(cart).map((productId) => (
        <div key={productId} className="cart-item">
          <img src={cart[productId].image} alt={cart[productId].title} />
          <div className="details">
            <p className="category">{cart[productId].category}</p>
            <p className="description">{cart[productId].title}</p>
            <p className="price">${cart[productId].price}</p>
            <div className="quantity-controls">
              <button onClick={() => removeFromCart(productId)}>-</button>
              <span>{quantities[productId]}</span>
              <button onClick={() => addToCart(cart[productId])}>+</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;