import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { CartItem, RewardItem, CartContextType } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (reward: RewardItem, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.reward.id === reward.id);

      if (existingItem) {
        // Update quantity if item already in cart
        return prevCart.map((item) =>
          item.reward.id === reward.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevCart, { reward, quantity }];
      }
    });
  };

  const removeFromCart = (rewardId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.reward.id !== rewardId));
  };

  const updateQuantity = (rewardId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(rewardId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.reward.id === rewardId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPoints = (): number => {
    return cart.reduce(
      (total, item) => total + item.reward.points * item.quantity,
      0
    );
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPoints,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
