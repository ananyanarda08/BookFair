import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { useCart } from "../../context/CartContext";
import { Visibility, ErrorOutline } from "@mui/icons-material";
import {
  TextField,
  Slider,
  Typography,
} from "@mui/material";
import { axiosInstance } from "../../api/AxiosInstance";
import BookModal from "../../components/ViewBookModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Book {
  sellerId: string;
  author?: string;
  id: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  image?: string;
}

const BuyerDashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, clearCart, cart } = useCart();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [bookNameFilter, setBookNameFilter] = useState<string>("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get<Book[]>("/books");
        setBooks(response.data);
      } catch (err) {
        setError("Failed to load books. Please try again later.");
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (books.length === 0) {
      clearCart();
    }
  }, [books, clearCart]);

  useEffect(() => {
    const filtered = books.filter((book) => {
      const matchesPrice =
        book.price >= priceRange[0] && book.price <= priceRange[1];
      const matchesName = book.name
        .toLowerCase()
        .includes(bookNameFilter.toLowerCase());
      return matchesPrice && matchesName;
    });
    setFilteredBooks(filtered);
  }, [books, priceRange, bookNameFilter]);

  const handleViewOpen = (book: Book) => {
    setSelectedBook(book);
    setViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setViewModalOpen(false);
    setSelectedBook(null);
  };

  const handleAddToCart = (book: Book) => {
    const existingBook = cart.find((item) => item.id === book.id);

    if (existingBook) {
      toast.info("This book is already in your cart!", {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      const bookWithQuantity = { ...book, quantity: book.quantity || 1 };
      addToCart(bookWithQuantity);
      toast.success("Book added to your cart!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <Layout>
      <div className="bg-[#f1f1ee] mt">
        <div className="p-4 md:p-10 min-h-screen text-[#1c4e23]">
          <h2 className="text-2xl md:text-5xl font-bold mt-20 mb-6 text-[#3A7D44]">
            Available Books
          </h2>

          <div className="mb-4 flex flex-col sm:flex-row justify-between gap-10">
            <TextField
              label="Filter by Book Name"
              variant="outlined"
              value={bookNameFilter}
              onChange={(e) => setBookNameFilter(e.target.value)}
              sx={{
                width: { xs: "100%", sm: "23%" },
                marginTop: { xs: "10px", sm: "0" },
              }}
            />
            <div className="w-full flex flex-col">
              <Typography variant="body2" color="text.secondary">
                Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
              </Typography>
              <Slider
                value={priceRange}
                onChange={(e, newValue) => setPriceRange(newValue as number[])}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
                sx={{
                  width: "40%",
                  height: 6,
                  "& .MuiSlider-thumb": {
                    width: 16,
                    height: 16,
                    backgroundColor: "#1c4e23",
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: "#e0e0e0",
                  },
                  "& .MuiSlider-track": {
                    backgroundColor: "#1c4e23",
                  },
                }}
              />
            </div>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading books...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center mt-20">
              <ErrorOutline sx={{ fontSize: 50, color: "#FF6347" }} />
              <p className="text-gray-500 mt-4">No books available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-[#effde8] border border-[#3A7D44] p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                >
                  <img
                    src={book.image}
                    alt={book.name}
                    className="w-full h-64 sm:h-72 md:h-80 object-contain mb-4 rounded-lg"
                  />
                  <h3 className="text-xl sm:text-2xl md:text-3xl text-[#133518] font-bold">
                    {book.name}
                  </h3>
                  <p className="text-[#133518] font-semibold text-sm sm:text-base md:text-lg">
                    By {book.author}
                  </p>
                  <p className="text-[#133518] font-semibold text-sm sm:text-base md:text-lg">
                    ₹{book.price}
                  </p>
                  <div className="flex justify-between">
                    <p className="text-[#133518] font-semibold text-sm sm:text-base md:text-lg">
                      Stock: {book.stock}
                    </p>
                    <Visibility
                      sx={{
                        fontSize: 34,
                        cursor: "pointer",
                        color: "#3A7D44",
                      }}
                      onClick={() => handleViewOpen(book)}
                    />
                  </div>
                  <button
                    className="mt-3 bg-[#3A7D44] hover:bg-[#316a2c] text-white py-2 px-4 rounded-lg w-full transition duration-300"
                    onClick={() => handleAddToCart(book)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}

          <BookModal
            open={viewModalOpen}
            onClose={handleCloseModal}
            book={selectedBook}
          />
          <ToastContainer />
        </div>
      </div>
    </Layout>
  );
};

export default BuyerDashboard;
