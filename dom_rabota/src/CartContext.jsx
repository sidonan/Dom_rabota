import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || {};
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const newCart = { ...prevCart };
            if (newCart[product.id]) {
                newCart[product.id].quantity += 1;
            } else {
                newCart[product.id] = { ...product, quantity: 1 };
            }
            return newCart;
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const newCart = { ...prevCart };
            if (newCart[productId]?.quantity > 1) {
                newCart[productId].quantity -= 1;
            } else {
                delete newCart[productId];
            }
            return newCart;
        });
    };

    const clearCart = () => setCart({});

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};