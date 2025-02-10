// src/components/BookModal.tsx
import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

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

interface BookModalProps {
  open: boolean;
  onClose: () => void;
  book: Book | null;
}

const BookModal: React.FC<BookModalProps> = ({ open, onClose, book }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 420,
          bgcolor: "#F8F5E9",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
        className="shadow-lg bg-white border border-gray-200"
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <Typography variant="h5" className="font-bold text-[#133618]">
            View Book
          </Typography>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            ✖
          </button>
        </div>

        {book && (
          <div className="space-y-3">
            <Typography
              variant="h6"
              className="text-[#133618] font-semibold"
            >
              Name:{" "}
              <span className="font-medium text-gray-700">{book.name}</span>
            </Typography>
            <Typography className="text-gray-600">
              Author:{" "}
              <span className="font-medium">{book.author}</span>
            </Typography>
            <Typography className="text-gray-600">
              Price:{" "}
              <span className="font-medium">₹{book.price}</span>
            </Typography>
            <Typography className="text-gray-600">
              Stock:{" "}
              <span className="font-medium">{book.stock}</span>
            </Typography>

            <div className="flex justify-center mt-3">
              <img
                src={book.image}
                alt={book.name}
                className="w-[180px] h-[240px] object-contain border rounded-lg shadow-md"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderColor: "#133618",
              color: "#133618",
              "&:hover": {
                borderColor: "#0F2D14",
                backgroundColor: "#133618",
                color: "white",
              },
            }}
          >
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default BookModal;
