import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Divider, Grid } from "@mui/material";
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
    <Grid item xs={12} md={6}>
      <Card
        className="shadow-lg rounded-lg min-h-[750px] mx-h-[750px]"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "#F8F5E9",
        }}
      >
        <CardContent>
          <div className="space-y-4">
            <Typography
              variant="h3"
              className="text-[#1c4e23]"
              sx={{ fontWeight: 900 }}
            >
              Your Order 
            </Typography>
            <Divider />

            <div className="max-h-[600px] overflow-y-auto space-y-4 p-2">
              {orders.length === 0 ? (
                <div className="flex items-center justify-center flex-col min-h-[150px]">
                  <ShoppingCartIcon style={{ fontSize: 200 }} color="disabled" />
                  <Typography variant="h5" className="text-center mt-2 text-gray-500">
                    No orders yet!
                  </Typography>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="order-item space-y-4"
                    style={{
                      boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
                      padding: "16px",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 900, color: "#1c4e23" }}
                    >
                      Order ID: {order.id}
                    </Typography>
                    <div className="grid grid-cols-2">
                      <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        <span className="font-bold">Name: </span>
                        {order.name}
                      </Typography>
                      <Typography variant="body1">
                        <span className="font-bold">Address: </span>{" "}
                        {order.address}
                      </Typography>
                      <Typography variant="body1">
                        <span className="font-bold">Phone: </span>{" "}
                        {order.phone}
                      </Typography>
                      <Typography variant="body1">
                        <span className="font-bold">Items: </span>{" "}
                        {order.items
                          .map((item: { name: any }) => item.name)
                          .join(", ")}
                      </Typography>
                    </div>
                    <Button
                      size="medium"
                      color="primary"
                      onClick={() => handleViewOrder(order)}
                    >
                      View Order
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>


      <OrderModal
        open={openModal}
        onClose={handleCloseModal}
        order={selectedOrder}
      />
    </Grid>
  );
};

export default OrderSection;
