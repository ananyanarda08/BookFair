import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { Order } from "../pages/seller/OrderList";

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  order: Order | null;
}

const OrderModal: React.FC<OrderModalProps> = ({ open, onClose, order }) => {
  const totalPrice = order?.items.reduce((acc, item) => {
    const itemPrice = typeof item.price === "number" ? item.price : 0;

    const itemQuantity = typeof item.quantity === "number" ? item.quantity : 0;

    return acc + itemPrice * itemQuantity;
  }, 0);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
        className="shadow-lg bg-white border border-gray-200"
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <Typography variant="h5" className="font-bold text-[#3A7D44]">
            Order Details
          </Typography>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            ✖
          </button>
        </div>

        <div className="space-y-2">
          <Typography variant="h6" className="font-semibold">
            Name:{" "}
            <span className="font-normal text-gray-800">{order?.name}</span>
          </Typography>
          <Typography className="text-gray-800">
            Address:{" "}
            <span className="font-medium">{order?.address}</span>
          </Typography>
          <Typography className="text-gray-800">
            Phone:{" "}
            <span className="font-medium">{order?.phone}</span>
          </Typography>
          {order?.items.map((item, index) => (
            <div key={index} className="space-y-2">
              <Typography className="text-gray-800">
                Book Name:<span className="font-medium">{item.name}</span>
              </Typography>
              <Typography className="text-gray-800">
                Stock: <span className="font-medium">{item.quantity}</span>
              </Typography>
            </div>
          ))}
          {totalPrice !== undefined && (
            <div className="flex justify-between mt-4 font-semibold">
              <Typography>Total Price:</Typography>
              <Typography>₹{totalPrice}</Typography>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderColor: "#3A7D44",
              color: "#3A7D44",
              "&:hover": {
                borderColor: "#2A5D34",
                backgroundColor: "#3A7D44",
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

export default OrderModal;
