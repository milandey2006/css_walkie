"use client";

import { createContext, useContext, useState, useMemo } from "react";
import { differenceInDays } from "date-fns";

const RentalContext = createContext();

export function RentalProvider({ children }) {
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalDays = useMemo(() => {
    if (deliveryDate && pickupDate) {
      const days = differenceInDays(pickupDate, deliveryDate) + 1;
      return days > 0 ? days : 0;
    }
    return 0;
  }, [deliveryDate, pickupDate]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Auto-open cart on add
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + amount;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const setQuantity = (productId, value) => {
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 0) return;
    
    setCartItems(prev => prev.map(item => {
      if (item.id === productId) {
        // If the value is 0, we could remove it or keep it at 1. Let's keep it at 1 for consistency with buttons.
        return { ...item, quantity: Math.max(1, numValue) };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  return (
    <RentalContext.Provider value={{ 
      deliveryDate, setDeliveryDate, 
      pickupDate, setPickupDate, 
      totalDays,
      cartItems, addToCart, removeFromCart, updateQuantity, setQuantity, clearCart,
      isCartOpen, setIsCartOpen,
      isCheckoutModalOpen, setIsCheckoutModalOpen
    }}>
      {children}
    </RentalContext.Provider>
  );
}

export function useRental() {
  return useContext(RentalContext);
}
