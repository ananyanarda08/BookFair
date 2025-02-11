import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Button, IconButton, Modal, Box } from "@mui/material";
import { Delete, Remove, Add, ArrowBack } from "@mui/icons-material";
import Layout from "../../Layout/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../../api/AxiosInstance";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    id: 0,
    bookName: "",
    price: 0,
    quantity: 0,
    name: "",
    address: "",
    phone: "",
  });

  const handleOpenOrderModal = (book: any) => {
    setOrderInfo({
      ...orderInfo,
      id: book.id,
      bookName: book.name,
      price: book.price,
      quantity: book.quantity,
    });
    setOpenOrderModal(true);
  };

  const handleCloseOrderModal = () => {
    setOpenOrderModal(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
  });

  const handleSubmitOrder = async (values: any) => {
    const orderWithBuyerDetails = {
      ...values,
      sellerId: orderInfo.id,
      items: [
        {
          id: orderInfo.id,
          name: orderInfo.bookName,
          price: orderInfo.price,
          quantity: orderInfo.quantity,
        },
      ],
    };

    try {
      const response = await axiosInstance.post("/orders", orderWithBuyerDetails);

      if (response.status === 201) {
        removeFromCart(orderInfo.id);
        setOpenOrderModal(false);
        navigate("/buyer-dashboard");
        toast.success("Order placed successfully!");
      } else {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order.");
    }
  };

  const totalPrice = cart.reduce((total, book) => total + book.price * book.quantity, 0);

  return (
    <Layout>
      <div className="min-h-screen bg-[#F8F5E9] text-[#1c4e23] p-6 md:p-20 mt-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl mt-10 font-bold text-[#3A7D44]">Your Cart 🛒</h1>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/buyer-dashboard")}
            variant="contained"
            sx={{ backgroundColor: "#3A7D44", color: "white", marginTop:10 }}
          >
            Back to Books Dashboard
          </Button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-500 mt-4">Your cart is empty.</p>
        ) : (
          <div className="bg-[#9DC08B] p-6 rounded-lg shadow-lg">
            {cart.map((book) => (
              <div
                key={book.id}
                className="flex flex-wrap items-center border-b border-[#3A7D44] py-4 last:border-none"
              >
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-24 h-32 object-cover rounded-md mb-4 sm:mb-0"
                />
                <div className="ml-6 flex-1">
                  <h2 className="text-lg sm:text-xl font-semibold text-[#3A7D44]">
                    {book.name}
                  </h2>
                  <p className="text-[#1c4e23] text-sm">Seller: Book Store</p>
                  <p className="mt-1 text-xl font-bold text-[#3A7D44]">
                    ₹{book.price}
                  </p>   
                  <div className="flex items-center mt-3 gap-1" >
                    <IconButton
                      onClick={() => updateQuantity(book.id, book.quantity - 1)}
                      disabled={book.quantity === 1}
                    >
                      <Remove />
                    </IconButton>
                    <span className="px-4 text-lg">{book.quantity}</span>
                    <IconButton
                      onClick={() => updateQuantity(book.id, book.quantity + 1)}
                    >
                      <Add />
                    </IconButton>
                    <Button
                      startIcon={<Delete />}
                      onClick={() => removeFromCart(book.id)}
                      sx={{ color: "red" }}
                    >
                      Remove
                    </Button>
                    <Button
                      onClick={() => handleOpenOrderModal(book)}
                      sx={{ backgroundColor: "#3A7D44", color: "white" }}
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#3A7D44]">Total Price</h2>
              <p className="text-xl font-bold text-[#3A7D44]">₹{totalPrice}</p>
            </div>
          </div>
        )}

        <Modal open={openOrderModal} onClose={handleCloseOrderModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2 className="font-bold text-[#3A7D44]">Place Order</h2>
            <Formik
              initialValues={{
                name: orderInfo.name,
                address: orderInfo.address,
                phone: orderInfo.phone,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmitOrder}
            >
              {({ handleChange, handleBlur, values, touched, errors }) => (
                <Form>
                  <div>
                    <label className="block text-sm font-semibold">Name</label>
                    <input
                      type="text"
                      className="w-full p-2 mt-2 border border-[#3A7D44] rounded"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.name && errors.name && (
                      <div className="text-red-500 text-xs">{errors.name}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Address</label>
                    <input
                      type="text"
                      className="w-full p-2 mt-2 border border-[#3A7D44] rounded"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.address && errors.address && (
                      <div className="text-red-500 text-xs">{errors.address}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Phone</label>
                    <input
                      type="text"
                      className="w-full p-2 mt-2 border border-[#3A7D44] rounded"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.phone && errors.phone && (
                      <div className="text-red-500 text-xs">{errors.phone}</div>
                    )}
                  </div>
                  <Button
                    type="submit"
                    sx={{
                      backgroundColor: "#3A7D44",
                      color: "white",
                      width: "100%",
                      mt: 4,
                    }}
                  >
                    Place Order
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Modal>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default CartPage;
