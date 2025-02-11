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
  const [cart, setCart] = useState<Book[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get("/cart");
        if (response.data) {
          setCart(response.data);
        } else {
          setCart([]);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const updateCartOnServer = async (updatedCart: Book[]) => {
    try {
      const response = await axiosInstance.put("/cart", updatedCart);
      if (response.status === 200) {
        console.log("Cart updated on server:", response.data);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const addToCart = (item: Book) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCart = [...prevCart, { ...item, quantity: 1 }];
      }

      updateCartOnServer(updatedCart);

      return updatedCart;
    });
  };

  const removeFromCart = async (id: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);

      updateCartOnServer(updatedCart);

      return updatedCart;
    });

    await axiosInstance.delete(`/cart/${id}`);
  };

  const updateQuantity = async (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );

    await updateCartOnServer(cart);
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
        await axiosInstance.delete("/cart");  
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
