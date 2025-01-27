const removeFromCart = (productId, removeAll) => {
    if (removeAll) {
      
      const newCart = { ...cart };
      delete newCart[productId];
      setCart(newCart);
  
      const newQuantities = { ...quantities };
      delete newQuantities[productId];
      setQuantities(newQuantities);
    } else {
      
      const newQuantities = { ...quantities };
      newQuantities[productId] -= 1;
  
      if (newQuantities[productId] === 0) {
      
        const newCart = { ...cart };
        delete newCart[productId];
        setCart(newCart);
  
        delete newQuantities[productId];
      }
  
      setQuantities(newQuantities);
    }
  };
  