import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import { axiosInstance } from "../../api/AxiosInstance";
import Layout from "../../Layout/Layout";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Dummy function to simulate fetching order history
const fetchOrderHistory = () => {
  return JSON.parse(localStorage.getItem("orders") || "[]");
};

const BuyerProfile: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Debugging: Log user and order data
    console.log("User ID:", user.id);

    // Fetching order history when component mounts
    const orderHistory = fetchOrderHistory();
    console.log("Fetched Orders:", orderHistory);

    // Filtering orders for the logged-in buyer
    const userOrders = orderHistory.filter(
      (order: { userId: any }) => order.userId === user.id
    );
    setOrders(userOrders);
  }, [user.id]);

  useEffect(() => {
    fetchOrders(); // Call fetch orders on component mount
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/orders");
      setOrders(response.data); // Save fetched orders to state
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders.");
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-10 mt-28 top-100  bg-[#F8F5E9] rounded-2xl">
        <Grid container spacing={4}>
          {/* Profile Section */}
          <Grid item xs={12} md={6}>
            <Card
              className="shadow-lg rounded-lg "
              style={{
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
              }}
            >
              <CardContent>
                <h2 className="text-3xl font-semibold mb-4 text-[#1c4e23]">
                  Your Profile
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Typography
                      variant="h6"
                      className="font-bold w-1/3 text-black"
                    >
                      Name:
                    </Typography>
                    <Typography variant="h6" className="w-2/3 text-black">
                      {user.name}
                    </Typography>
                  </div>
                  <Divider />

                  <div className="flex items-center">
                    <Typography
                      variant="h6"
                      className="font-semibold w-1/3 text-black"
                    >
                      Email:
                    </Typography>
                    <Typography variant="h6" className="w-2/3 text-black">
                      {user.email}
                    </Typography>
                  </div>
                  <Divider />
                </div>
              </CardContent>
            </Card>
          </Grid>

          {/* Order History Section */}
          <Grid item xs={12} md={6}>
            <Card
              className="shadow-lg rounded-lg"
              style={{
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
              }}
            >
              <CardContent>
                <div className="space-y-4">
                  <Typography
                    variant="h3"
                    className=" text-[#1c4e23]"
                    sx={{ fontWeight: 900 }}
                  >
                    Your Order History
                  </Typography>
                  <Divider />

                  <div className="max-h-[500px] overflow-y-auto space-y-4 p-2">
                    {orders.length === 0 ? (
                      <p>No orders yet!</p>
                    ) : (
                      orders.map((order) => (
                        <div
                          key={order.id}
                          className="order-item space-y-4  "
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
                            <Typography variant="body1" sx={{marginBottom:2}}>
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
                     
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate("/buyer-dashboard")}
              variant="contained"
              sx={{ backgroundColor: "#3A7D44", color: "white", marginTop: 3 }}
            >
              Back 
            </Button>
          </Grid>
        </Grid>
      </div>
    </Layout>   
  );
};

export default BuyerProfile;
