import { useState, useEffect } from "react";
import ProductsList from "./ProductsList";
import Cart from "./Cart";

const API_URL = "https://fakestoreapi.com/products";
const CATEGORIES = ["All", "Men's Clothing", "Women's Clothing", "Electronics", "Jewelery"];

const AppContainer = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState({});
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filterProducts = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category.toLowerCase() === category.toLowerCase()));
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: prevCart[product.id]
        ? { ...prevCart[product.id], quantity: prevCart[product.id].quantity + 1 }
        : { ...product, quantity: 1 },
    }));
    setQuantities((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
  };

  const removeFromCart = (productId) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[productId] || 0) - 1;
  
      if (newQuantity <= 0) {
        
        setCart((prevCart) => {
          const { [productId]: _, ...updatedCart } = prevCart;
          return updatedCart;
        });
  
        const { [productId]: _, ...updatedQuantities } = prevQuantities;
        return updatedQuantities;
      }
  

      return {
        ...prevQuantities,
        [productId]: newQuantity,
      };
    });
  
    setCart((prevCart) => {
      if (prevCart[productId]?.quantity > 1) {
        return {
          ...prevCart,
          [productId]: {
            ...prevCart[productId],
            quantity: prevCart[productId].quantity - 1,
          },
        };
      }
      return prevCart;
    });
  };
  

  return (
    <div className="container">
      <div className="buttons">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => filterProducts(cat)}
            className={selectedCategory === cat ? "active" : "category-button"}
          >
            {cat}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <ProductsList products={filteredProducts} addToCart={addToCart} removeFromCart={removeFromCart} quantities={quantities} />
      )}
      <div className="cart-container">
        {Object.keys(cart).length > 0 && (
          <Cart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} quantities={quantities} />
        )}
      </div>
    </div>
  );
};

export default AppContainer;