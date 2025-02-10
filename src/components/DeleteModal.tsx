import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  bookName,
}) => {
      
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" className="font-semibold text-gray-800">
          Are you sure you want to delete "{bookName}"?
        </Typography>
        <Typography className="text-gray-600 mt-2">
          This action cannot be undone.
        </Typography>
        <div className="flex justify-center gap-4 mt-4">
          <Button
            onClick={onClose}
            variant="contained"
            sx={{ bgcolor: "gray", "&:hover": { bgcolor: "darkgray" } }}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            sx={{ bgcolor: "#D32F2F", "&:hover": { bgcolor: "#B71C1C" } }}
          >
            Delete
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;