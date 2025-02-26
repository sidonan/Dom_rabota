import React from "react";
import { useCart } from "./CartContext"; // Импортируем useCart

const Cart = () => {
    const { cart, removeFromCart, clearCart, addToCart } = useCart();

    return (
        <div className="cart">
            <h2 className="cart-title">Cart</h2>
            {Object.keys(cart).length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                <div>
                  <div className="cart-items">
                    {Object.keys(cart).map((productId) => (
                        <div key={productId} className="cart-item">
                            <img src={cart[productId].image} alt={cart[productId].title} />
                            <div className="details">
                                <p className="category">{cart[productId].category}</p>
                                <p className="description">{cart[productId].title}</p>
                                <p className="price">${cart[productId].price}</p>
                                <div className="quantity-controls">
                                    <button className="minus" onClick={() => removeFromCart(productId)}>-</button>
                                    <span>{cart[productId].quantity}</span>
                                    <button className="plus" onClick={() => addToCart(cart[productId])}>+</button>
                                </div>
                            </div>
                        </div>
                    ))}</div>

                      <p className="amount">Amount: ${Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
                      <button className="clear-order" onClick={clearCart}>Clear order</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
