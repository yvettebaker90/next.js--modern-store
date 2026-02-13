"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { Product } from "@/types/product";

// CartItem extends Product with a quantity property for how many are in cart
type CartItem = Product & { quantity: number };

/**
 * CartContextType - Type definition for the cart context value
 * 
 * Methods:
 * - cart: Array of items currently in shopping cart (with quantities)
 * - favorites: Array of products saved to wishlist/favorites
 * - addToCart(product): Adds product to cart or increments quantity if already exists
 * - removeFromCart(productId): Completely removes product from cart
 * - toggleFavorite(product): Adds or removes product from favorites
 * - isFavorite(productId): Returns true if product is in favorites
 */
type CartContextType = {
  cart: CartItem[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
};

// Create the context for cart management
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * CartProvider - React Context Provider for global cart and favorites state
 * 
 * Wraps the entire application to provide cart functionality across all components
 * Without needing to pass props down multiple levels (prop drilling)
 * 
 * Usage: Wrap your app with: <CartProvider>{children}</CartProvider>
 */
export function CartProvider({ children }: { children: ReactNode }) {
  // State for items currently in shopping cart
  const [cart, setCart] = useState<CartItem[]>([]);
  // State for items saved to favorites/wishlist
  const [favorites, setFavorites] = useState<Product[]>([]);

  /**
   * addToCart - Adds a product to the cart or increases quantity if already exists
   * 
   * Logic:
   * - Check if product already exists in cart by id
   * - If exists: increment its quantity by 1
   * - If not exists: add it with quantity 1
   */
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Product already in cart, increment quantity
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Product not in cart, add it with quantity 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  /**
   * removeFromCart - Completely removes a product from the cart
   * 
   * Filters out the item matching the productId
   */
  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  /**
   * toggleFavorite - Adds or removes a product from favorites
   * 
   * Logic:
   * - Check if product already in favorites by id
   * - If exists: remove it (unfavorite)
   * - If not exists: add it (favorite)
   */
  const toggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        // Product in favorites, remove it
        return prev.filter((item) => item.id !== product.id);
      }
      // Product not in favorites, add it
      return [...prev, product];
    });
  };

  /**
   * isFavorite - Check if a product is in the favorites array
   * 
   * Returns: boolean - true if product id exists in favorites, false otherwise
   */
  const isFavorite = (productId: number) =>
    favorites.some((item) => item.id === productId);

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * useCart - Custom React Hook to access cart context
 * 
 * Returns: CartContextType with all cart methods and state
 * 
 * Usage: const { cart, addToCart, favorites } = useCart();
 * 
 * Error: Throws if used outside of CartProvider component
 * This ensures the hook can only be used in components wrapped by CartProvider
 */
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
