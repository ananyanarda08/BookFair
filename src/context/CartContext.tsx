import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../api/AxiosInstance";

export interface Book {
  sellerId: string;
  author?: string;
  id: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  image?: string;
}

interface CartContextType {
  cart: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  placeOrder: () => void;
  clearCart: () => void;
  getTotalPrice: () => number; 
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Book[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Book) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = async (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    localStorage.setItem("cart", JSON.stringify(cart.filter((item) => item.id !== id)));
    await axiosInstance.delete(`/cart/${id}`);
  };

  const updateQuantity = async (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
    localStorage.setItem("cart", JSON.stringify(cart));
    await axiosInstance.patch(`/cart/${id}`, { quantity });
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    try {
      const orderData = {
        books: cart,
        totalPrice: cart.reduce((total, book) => total + book.price * book.quantity, 0),
      };

      const response = await axiosInstance.post("/orders", orderData);

      if (response.status === 201) {
        toast.success("Order placed successfully!");
        setCart([]); 
        localStorage.removeItem("cart"); 
      } else {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order.");
    }
  };

  const clearCart = async () => {
    setCart([]);
    localStorage.removeItem("cart");
    await axiosInstance.delete("/cart");
  };
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, placeOrder, clearCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
