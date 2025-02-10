import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify"; 
import { axiosInstance } from "../api/AxiosInstance";

// Define the types
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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Book[]>([]);

  useEffect(() => {
    axiosInstance.get("/cart")
      .then((res) => setCart(res.data))
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  const addToCart = (item: Book) => {
    setCart((prevCart:any) => {
      const existingItem = prevCart.find((cartItem: { id: number; }) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem: { id: number; quantity: number; }) =>
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
    const itemToRemove = cart.find(item => item.id === id);
    if (itemToRemove) {
      await updateStock(id, itemToRemove.quantity);
    }

    setCart(cart.filter((item) => item.id !== id));
    await axiosInstance.delete(`/cart/${id}`);
  };

  const updateQuantity = async (id: number, quantity: number) => {
    const itemToUpdate = cart.find(item => item.id === id);
    if (itemToUpdate && quantity <= itemToUpdate.stock) {
      setCart(cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ));

      await axiosInstance.patch(`/cart/${id}`, { quantity });
      await updateStock(id, quantity - itemToUpdate.quantity);
    } else {
      toast.error("Not enough stock available!");
    }
  };

  const updateStock = async (bookId: number, quantityChange: number) => {
    try {
      const response = await axiosInstance.get(`/books/${bookId}`);
      const bookData = response.data;

      const updatedStock = bookData.stock + quantityChange;
      if (updatedStock < 0) {
        toast.error("Not enough stock available for the seller.");
        return;
      }

      await axiosInstance.patch(`/books/${bookId}`, {
        stock: updatedStock
      });
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty. Add some books before placing the order.");
      return;
    }

    try {

      const orderData = {
        books: cart,
        totalPrice: cart.reduce((total, book) => total + (book.price * book.quantity), 0)
      };
      console.log(orderData, 'orderData')

      const response = await axiosInstance.post("/orders", orderData);

      if (response.status === 201) {
        toast.success("Order placed successfully!");
        setCart([]); 
      } else {
        toast.error("Failed to place order. Please try again.");
      }

      for (const book of cart) {
        await updateStock(book.id, -book.quantity);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  const clearCart = async () => {
    await axiosInstance.delete("/cart"); 
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, placeOrder, clearCart,  }}>
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
