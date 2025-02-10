import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface ViewModalProps {
  open: boolean;
  onClose: () => void;
  book?: Book | null;
  order?: any;  
}
 type Book = {
    id: number;
    name: string;
    author: string;
    price: number;
    stock:number,
    image: string;
  };
const ViewModal: React.FC<ViewModalProps> = ({ open, onClose, book, order }) => {
  if (!book && !order) return null; 

  return (
    <Modal open={open} onClose={onClose}>
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
        {book && (
          <>
            <Typography variant="h6" className="font-bold mb-4">View Book Details</Typography>
            <Typography variant="h6" className="font-semibold">Name: {book.name}</Typography>
            <Typography color="text.secondary" className="text-gray-600">Author: {book.author}</Typography>
            <Typography color="text.secondary" className="text-gray-600">Stock: {book.stock}</Typography>
            <Typography variant="h6" className="text-green-600 font-bold">Price: ₹{book.price}</Typography>
          </>
        )}

        {order && (
          <>
            <Typography variant="h6" className="font-bold mb-4">View Order Details</Typography>
            <Typography variant="h6" className="font-semibold">Order Name: {order.name}</Typography>
            <Typography color="text.secondary" className="text-gray-600">Address: {order.address}</Typography>
            <Typography color="text.secondary" className="text-gray-600">Phone: {order.phone}</Typography>
            <Typography color="text.secondary" className="text-gray-600">Status: {order.status}</Typography>
            <Typography variant="h6" className="font-semibold mt-2">Items Ordered:</Typography>
            <Typography>{order.items?.map((item: { name: string }) => item.name).join(", ")}</Typography>
          </>
        )}

        <div className="flex justify-between mt-4">
          <Button variant="outlined" onClick={onClose}>Close</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ViewModal;