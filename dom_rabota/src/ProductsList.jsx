import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext"; 

const ProductList = () => {
    const { cart, addToCart, removeFromCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("all");

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            });
    }, []);

    const filteredProducts = category === "all" ? products : products.filter((p) => p.category === category);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container">
            <div className="buttons">
                <button className={category === "all" ? "active" : ""} onClick={() => setCategory("all")}>All</button>
                <button className={category === "men's clothing" ? "active" : ""} onClick={() => setCategory("men's clothing")}>Men's Clothing</button>
                <button className={category === "women's clothing" ? "active" : ""} onClick={() => setCategory("women's clothing")}>Women's Clothing</button>
                <button className={category === "electronics" ? "active" : ""} onClick={() => setCategory("electronics")}>Electronics</button>
                <button className={category === "jewelery" ? "active" : ""} onClick={() => setCategory("jewelery")}>Jewelery</button>
            </div>

            <div className="products-grid">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.title} />
                        <p className="category">{product.category}</p>
                        <h2 className="description">{product.title}</h2>
                        <div className="Price_Cart">
                            <p className="price">${product.price}</p>
                            {cart[product.id] ? (
                                <div className="quantity-controls">
                                    <button className="minus" onClick={() => removeFromCart(product.id)}>-</button>
                                    <span>{cart[product.id].quantity}</span>
                                    <button className="plus" onClick={() => addToCart(product)}>+</button>
                                </div>
                            ) : (
                                <button className="add-to-cart" onClick={() => addToCart(product)}>Add to cart</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
