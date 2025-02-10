import React, { ReactNode, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Modal,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface Book {
  quantity: ReactNode;
  id: string;
  name: string;
  stock: number;
}

interface Order {
  quantity: ReactNode;
  bookName: ReactNode;
  id: string;
  name: string;
  address: string;
  phone: string;
  items: Book[];
}

interface OrderSectionProps {
  orders: Order[];
}

const OrderSection: React.FC<OrderSectionProps> = ({ orders }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="bg-[#9DC08B] p-6 rounded-lg shadow-lg flex flex-col max-h-[335px]">
      <h3 className="text-4xl font-semibold mb-4 text-[#1c4e23]">Orders</h3>
      <div
        className={`flex-grow ${
          orders.length === 0 ? "overflow-hidden" : "overflow-y-auto"
        }`}
      >
        {orders?.length === 0 ? (
          <div className="flex items-center justify-center flex-col min-h-[150px]">
            <ShoppingCartIcon style={{ fontSize: 200 }} color="disabled" />
            <Typography variant="h5" className="text-center mt-2 text-gray-500">
              No orders so far
            </Typography>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8">
            {orders.map((order) => (
              <Card
                key={order.id}
                className="shadow-lg rounded-lg bg-[#F8F5E9]"
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    className="font-bold mb-2 text-[#1c4e23]"
                  >
                    Order: {order.name}
                  </Typography>
                  <Typography variant="body1" className="mb-1">
                    <strong>Address:</strong> {order.address}
                  </Typography>
                  <Typography variant="body1" className="mb-1">
                    <strong>Phone:</strong> {order.phone}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleViewOrder(order)}
                  >
                    View Order
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedOrder && (
        <Modal open={openModal} onClose={handleCloseModal}>
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
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-red-500 transition"
              >
                ✖
              </button>
            </div>

            <div className="space-y-2">
              <Typography variant="h6" className="font-semibold">
                Name:{" "}
                <span className="font-normal text-gray-700">
                  {selectedOrder.name}
                </span>
              </Typography>
              <Typography className="text-gray-600">
                Address:{" "}
                <span className="font-medium">{selectedOrder.address}</span>
              </Typography>
              <Typography className="text-gray-600">
                Phone:{" "}
                <span className="font-medium">{selectedOrder.phone}</span>
              </Typography>
              {selectedOrder.items.map((item, index) => (
                <div key={index}>
                  <Typography className="text-gray-600">
                    Book Name: <span className="font-medium">{item.name}</span>
                  </Typography>
                  <Typography className="text-gray-600">
                    Stock: <span className="font-medium">{item.quantity}</span>
                  </Typography>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <Button
                variant="outlined"
                onClick={handleCloseModal}
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
      )}
    </div>
  );
};

export default OrderSection;
