import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import OrderModal from "../../components/ViewOrderModal"; 

interface Book {
  price: React.ReactNode;
  quantity: React.ReactNode;
  id: string;
  name: string;
  stock: number;
}

export interface Order {
  quantity: React.ReactNode;
  bookName: React.ReactNode;
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
    <div className="bg-[#F8F5E9] p-6 rounded-lg shadow-lg flex flex-col max-h-[312px]">
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
                    className="font-bold mb-2 text-[#1c4e23] "
                  >
                    Order: {order.name}
                  </Typography>
                  <Typography variant="body1" className="mb-1 py-2">
                    <strong>Address:</strong> {order.address}
                  </Typography>
                  <Typography variant="body1" className="mb-1">
                    <strong>Phone:</strong> {order.phone}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="medium"
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

      <OrderModal
        open={openModal}
        onClose={handleCloseModal}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderSection;
