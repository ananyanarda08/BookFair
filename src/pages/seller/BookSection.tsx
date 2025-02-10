import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Slider,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Book as BookIcon,
  Visibility,
  Edit,
  Delete,
} from "@mui/icons-material";
import DeleteConfirmationModal from "../../components/DeleteModal";

interface Book {
  id: string;
  name: string;
  author: string;
  price: number;
  stock: number;
  image: string;
}

interface BooksSectionProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  fetchBooks: () => void;
  handleViewOpen: (book: Book) => void;
  handleEditOpen: (book: Book) => void;
  handleDelete: (id: string) => Promise<void>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BooksSection: React.FC<BooksSectionProps> = ({
  books,
  setBooks,
  // fetchBooks,
  handleViewOpen,
  handleEditOpen,
  handleDelete,
  setOpen,
}) => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [bookNameFilter, setBookNameFilter] = useState<string>("");

  // Filter books based on price range and name
  const filteredBooks = books.filter((book) => {
    const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1];
    const matchesName = book.name.toLowerCase().includes(bookNameFilter.toLowerCase());
    return matchesPrice && matchesName;
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleDeleteClick = (book: Book) => {
    setBookToDelete({ id: book.id, name: book.name });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!bookToDelete?.id) {
      alert("No book selected for deletion!");
      return;
    }

    try {
      await handleDelete(bookToDelete.id);
      setIsDeleteModalOpen(false);
      setBookToDelete(null);
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete the book. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-[#F8F5E9] rounded-lg shadow-lg md:col-span-2 flex flex-col max-h-[790px] overflow-y-auto">
      <h3 className="text-4xl font-semibold mb-4 text-[#1c4e23]">Book Management</h3>

      <div className="mb-4 flex flex-col sm:flex-row justify-between gap-10">
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: "#3A7D44",
            "&:hover": { backgroundColor: "#3A7D44" },
            display: "inline-block",
            width: { xs: "100%", sm: "200px" },
            padding: "12px 24px", 
          }}
          size="medium"
        >
          Add New Book
        </Button>

        <TextField
          label="Filter by Book Name"
          variant="outlined"
          value={bookNameFilter}
          onChange={(e) => setBookNameFilter(e.target.value)}
          sx={{
            width: { xs: "100%", sm: "23%" }, 
            marginTop: { xs: "10px", sm: "0" }, 
          }}
        />

        <div className="w-full sm:w-1/2 flex flex-col">
          <Typography variant="body2" color="text.secondary">
            Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
          </Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={1000} 
            sx={{
              width: "60%", 
              height: 6,
              "& .MuiSlider-thumb": {
                width: 16,
                height: 16,
                backgroundColor: "#1c4e23",
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#e0e0e0",
              },
              "& .MuiSlider-track": {
                backgroundColor: "#1c4e23",
              },
            }}
          />
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="flex items-center justify-center flex-col h-[560px] text-center">
          <BookIcon style={{ fontSize: 200 }} color="disabled" />
          <Typography variant="h5" className="mt-2 text-gray-500">
             No books match your filters
          </Typography>
        </div>
      ) : (
        <TableContainer component={Paper} className="mt-4">
          <Table sx={{ minWidth: 650, }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 900, fontSize: 20 }}>Image</TableCell>
                <TableCell sx={{ fontWeight: 900, fontSize: 20 }}>Book Name</TableCell>
                <TableCell sx={{ fontWeight: 900, fontSize: 20 }}>Author</TableCell>
                <TableCell sx={{ fontWeight: 900, fontSize: 20 }}>Stock</TableCell>
                <TableCell sx={{ fontWeight: 900, fontSize: 20 }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 900, fontSize: 20 ,  textAlign: "center"}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>
                    <img
                      src={book.image}
                      alt={book.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 800, fontSize: 17 }}>{book.name}</TableCell>
                  <TableCell sx={{ fontWeight: 800, fontSize: 17 }}>{book.author}</TableCell>
                  <TableCell sx={{ fontWeight: 800, fontSize: 17 }}>{book.stock}</TableCell>
                  <TableCell sx={{ fontWeight: 800, fontSize: 17 }}>₹{book.price}</TableCell>
                  <TableCell>
                    <div className="flex justify-between items-center]]">
                      <Visibility
                        sx={{
                          fontSize: 24,
                          cursor: "pointer",
                          color: "#3A7D44",
                        }}
                        onClick={() => handleViewOpen(book)}
                      />
                      <Edit
                        sx={{ fontSize: 24, cursor: "pointer", color: "blue" }}
                        onClick={() => handleEditOpen(book)}
                      />
                      <Delete
                        sx={{ fontSize: 24, cursor: "pointer", color: "red" }}
                        onClick={() => handleDeleteClick(book)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        bookName={bookToDelete?.name || "this book"}
      />
    </div>
  );
};

export default BooksSection;
