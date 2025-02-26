import React from "react";
import { CartProvider } from "./CartContext";
import ProductList from "./ProductsList";
import Cart from "./Cart";
import "./index.css";



const App = () => {
    return (
        <CartProvider>
            <h1>Shop</h1>
            <ProductList />
            <Cart />
        </CartProvider>
    );
};

export default App;
