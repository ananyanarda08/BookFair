import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Box, Button, Modal, Typography } from "@mui/material";
import CustomInputField from "../../components/CustomInputField";
import { axiosInstance } from "../../api/AxiosInstance";

interface BookFormProps {
  closeModal: () => void;
  refreshBooks: () => void;
  bookData?: {
    id: string;
    name: string;
    author: string;
    price: string;
    stock: string;
    image?: string;
  };
}

const BookForm: React.FC<BookFormProps> = ({
  closeModal,
  refreshBooks,
  bookData,
}) => {
  const [image, setImage] = useState<string | null>(bookData?.image || null);

  const initialValues = {
    name: bookData?.name || "",
    author: bookData?.author || "",
    price: bookData?.price || "",
    stock: bookData?.stock || "",
    image: bookData?.image || "",
  };
  

  const validationSchema = Yup.object({
    name: Yup.string().required("Book name is required"),
    author: Yup.string().required("Author is required"),
    price: Yup.number().required("Price is required"),
    stock: Yup.number()
      .required("Stock is required")
      .integer("Must be an integer"),
    image: Yup.string().required("Image is required"),
  });
  
  
  const handleSubmit = async (values: any, { resetForm }: any) => {
    const updatedBook = {
      ...values,
      image: image || "https://via.placeholder.com/150",
    };

    try {
      if (bookData) {
        const response = await axiosInstance.put(
          `/books/${bookData.id}`,
          updatedBook
        );
        if (response.status === 200) {
        }
      } else {
        const response = await axiosInstance.post("/books", updatedBook);
        if (response.status === 201) {
        }
      }
      resetForm();
      setImage(null);
      refreshBooks();
      closeModal();
    } catch (error) {
      console.error("Error saving book:", error);
      alert("Error saving book. Please try again.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setImage(event.target.result as string);
          setFieldValue("image", event.target.result); 
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <Modal open={true} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "#F8F5E9",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
        }}
        className="shadow-lg bg-white border border-gray-200"
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <Typography variant="h5" className="font-bold text-[#133618]">
            {bookData ? "Edit Book" : "Add Book"}
          </Typography>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-red-500 transition"
          >
            ✖
          </button>
        </div>

        <Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
  enableReinitialize
>
  {({ setFieldValue, errors, touched }) => (
    <Form className="space-y-4">
      <CustomInputField label="Book Name" name="name" type="text" placeholder="Enter book name" />
      <CustomInputField label="Author" name="author" type="text" placeholder="Enter author name" />
      <CustomInputField label="Price" name="price" type="number" placeholder="Enter price" />
      <CustomInputField label="Stock" name="stock" type="number" placeholder="Enter stock count" />

      <div className="mt-3">
        <Typography className="font-semibold text-gray-700 mb-1">
          Upload Image <span className="text-red-500">*</span>
        </Typography>
        <input
          type="file"
          onChange={(e) => handleImageUpload(e, setFieldValue)}
          className="w-full p-2 border rounded-lg"
        />
        {touched.image && errors.image && (
          <div className="text-red-500 text-sm">{errors.image}</div>
        )}
        {image && (
          <div className="flex justify-center mt-3">
            <img
              src={image}
              alt="Preview"
              className="w-[120px] h-[160px] object-contain border rounded-lg shadow-md"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#133618",
            "&:hover": { bgcolor: "#0F2D14" },
          }}
        >
          {bookData ? "Update Book" : "Add Book"}
        </Button>
      </div>
    </Form>
  )}
</Formik>

      </Box>
    </Modal>
  );
};

export default BookForm;
