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
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [openOrderModal, setOpenOrderModal] = useState(false);

  const handleCloseOrderModal = () => setOpenOrderModal(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
  });

  const handleSubmitOrder = async (values: any) => {
    const orderData = {
      ...values,
      items: cart.map((book) => ({
        id: book.id,
        name: book.name,
        price: book.price,
        quantity: book.quantity,
      })),
      createdAt: new Date(),
    };

    try {
      const response = await axiosInstance.post("/orders", orderData);

      if (response.status === 201) {
        clearCart();
        setOpenOrderModal(false);
        toast.success("Order placed successfully!", { position: "bottom-right" });
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
      <div className="min-h-[80vh] bg-[#f1f1ee] text-[#1c4e23] p-4 md:p-10 mt-24 mb-2 max-w-5xl mx-auto overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#3A7D44] text-center md:text-left">Your Cart</h1>
          <Button startIcon={<ArrowBack />} onClick={() => navigate("/buyer-dashboard")} variant="contained" sx={{ backgroundColor: "#3A7D44", color: "white" }}>
            Back
          </Button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-500 mt-4 text-center">Your cart is empty.</p>
        ) : (
          <div className="bg-[#F8F5E9] p-4 rounded-lg shadow-lg">
            {cart.map((book) => (
              <div key={book.id} className="flex flex-col md:flex-row justify-between items-center border-b border-[#3A7D44] py-3 last:border-none">
                <img src={book.image} alt={book.name} className="w-20 h-28 object-fill rounded-md" />
                <h1 className="text-lg md:text-2xl font-semibold text-[#3A7D44] text-center flex-1">{book.name}</h1>
                <p className="text-lg md:text-2xl font-bold text-[#3A7D44] pr-0 md:pr-20">₹{book.price}</p>
                <div className="flex items-center">
                  <IconButton onClick={() => updateQuantity(book.id, book.quantity - 1)} disabled={book.quantity === 1}>
                    <Remove />
                  </IconButton>
                  <span className="px-2 text-lg">{book.quantity}</span>
                  <IconButton onClick={() => updateQuantity(book.id, book.quantity + 1)}>
                    <Add />
                  </IconButton>
                </div>
                <Button startIcon={<Delete />} onClick={() => removeFromCart(book.id)} sx={{ color: "red", paddingLeft: 3 }}>
                  Remove
                </Button>
              </div>
            ))}

            <div className="mt-4 flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#3A7D44]">Total Price</h2>
              <p className="text-lg font-bold text-[#3A7D44]">₹{totalPrice}</p>
            </div>

            <div className="mt-4 text-center">
              <Button onClick={() => setOpenOrderModal(true)} sx={{ backgroundColor: "#3A7D44", color: "white", width: "100%" }}>
                Place Order
              </Button>
            </div>
          </div>
        )}

        <Modal open={openOrderModal} onClose={handleCloseOrderModal}>
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "90%", maxWidth: 400, bgcolor: "background.paper", borderRadius: 2, boxShadow: 24, p: 4 }}>
            <h2 className="font-bold text-[#3A7D44] text-center">Place Order</h2>
            <Formik initialValues={{ name: "", address: "", phone: "" }} validationSchema={validationSchema} onSubmit={handleSubmitOrder}>
              {({ handleChange, handleBlur, values, touched, errors }) => (
                <Form>
                  <div>
                    <label className="block text-sm font-semibold">Name</label>
                    <input type="text" className="w-full p-2 mt-2 border border-[#3A7D44] rounded" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                    {touched.name && errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Address</label>
                    <input type="text" className="w-full p-2 mt-2 border border-[#3A7D44] rounded" name="address" value={values.address} onChange={handleChange} onBlur={handleBlur} />
                    {touched.address && errors.address && <div className="text-red-500 text-xs">{errors.address}</div>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold">Phone</label>
                    <input type="text" className="w-full p-2 mt-2 border border-[#3A7D44] rounded" name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} />
                    {touched.phone && errors.phone && <div className="text-red-500 text-xs">{errors.phone}</div>}
                  </div>
                  <Button type="submit" sx={{ backgroundColor: "#3A7D44", color: "white", width: "100%", mt: 3 }}>Confirm Order</Button>
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
