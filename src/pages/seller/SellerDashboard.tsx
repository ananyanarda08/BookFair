import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";

import BookForm from "./BookForm";
import Layout from "../../Layout/Layout";
import SellerProfile from "./SellerProfile";
import { axiosInstance } from "../../api/AxiosInstance";
import OrderSection from "./OrderList";
import BooksSection from "./BookSection";
import BookModal from "../../components/BookModal";

const SellerDashboard: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchBooks();
    fetchOrders();
  }, []);

  const fetchBooks = () => {
    axiosInstance
      .get("/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  };

  const fetchOrders = () => {
    axiosInstance
      .get("/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  };

  const handleViewOpen = (book: any) => {
    setSelectedBook(book);
    setViewModalOpen(true);
  };

  const handleEditOpen = (book: any) => {
    setSelectedBook(book);
    setEditModalOpen(true);
  };

  const handleClose = () => {
    setViewModalOpen(false);
    setEditModalOpen(false);
    setSelectedBook(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  const handleCloseModal = () => {
    setViewModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <Layout>
      <div className="h-screen p-6 bg-[#F8F5E9] flex flex-col gap-4 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          <BooksSection
            books={books}
            setBooks={setBooks}
            fetchBooks={fetchBooks}
            handleViewOpen={handleViewOpen}
            handleEditOpen={handleEditOpen}
            handleDelete={handleDelete}
            open={open}
            setOpen={setOpen}
          />

          <div className="flex flex-col gap-6">
            <div className="bg-[#9DC08B] p-6 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold mb-4 text-[#1c4e23]">
                Your Profile - {user.shopName}
              </h2>
              <SellerProfile />
            </div>
            <OrderSection orders={orders} />
          </div>
        </div>

        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2 className="font-bold text-yellow-400">Add New Book</h2>
            <BookForm
              closeModal={() => setOpen(false)}
              refreshBooks={fetchBooks}
            />
          </Box>
        </Modal>

        <BookModal
          open={viewModalOpen}
          onClose={handleCloseModal}
          book={selectedBook}
        />

        <Modal open={editModalOpen} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2 className="font-bold text-yellow-400">Edit Book</h2>
            {selectedBook && (
              <BookForm
                closeModal={handleClose}
                refreshBooks={fetchBooks}
                bookData={selectedBook}
              />
            )}
          </Box>
        </Modal>
      </div>
    </Layout>
  );
};

export default SellerDashboard;
