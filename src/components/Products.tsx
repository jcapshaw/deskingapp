import React, { useState } from "react";
import {
  Modal,
  Button,
  Grid,
  Checkbox,
  Box,
  TextField,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "./Products.css";

export const PRODUCTS = [
  { id: 1, name: "SmartShield", value: 899 },
  { id: 2, name: "VTR", value: 299 },
  { id: 3, name: "Window Tint", value: 599 },
  { id: 4, name: "Door/Cup Guards", value: 299 },
  { id: 5, name: "ClearBra", value: 599 },
  { id: 6, name: "VSC", value: 2999 },
  { id: 7, name: "GAP", value: 999 },
  { id: 8, name: "Maintenance", value: 999 },
  { id: 9, name: "Ding Shield", value: 899 },
  { id: 10, name: "Credit Life", value: 599 },
];

interface Product {
  id: number;
  name: string;
  value: number;
}

interface ProductsProps {
  selectedProducts: number[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<number[]>>;
  totalProductValue: number;
}

const Products: React.FC<ProductsProps> = ({
  selectedProducts,
  setSelectedProducts,
  totalProductValue,
}) => {
  const [modalProductSelections, setModalProductSelections] =
    useState<number[]>(selectedProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmedProducts, setConfirmedProducts] = useState<number[]>([]);
  const [selectedProductNames, setSelectedProductNames] = useState<string[]>(
    [],
  );
  const [isTooltipModalOpen, setIsTooltipModalOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipModalOpen(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipModalOpen(false);
  };

  const modalStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    backgroundColor: "white",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    border: "1px solid #ccc",
    borderRadius: "12px",
    padding: "20px",
  };

  const handleProductChange = (isChecked: boolean, productId: number) => {
    let newSelections;
    if (isChecked) {
      newSelections = [...modalProductSelections, productId];
    } else {
      newSelections = modalProductSelections.filter((id) => id !== productId);
    }
    setModalProductSelections(newSelections);
  };

  const handleModalOpen = () => {
    setModalProductSelections(confirmedProducts);
    setIsModalOpen(true);
  };

  const handleConfirmSelection = () => {
    const selectedNames = PRODUCTS.filter((product) =>
      modalProductSelections.includes(product.id),
    ).map((product) => product.name);
    setSelectedProductNames(selectedNames);
    setConfirmedProducts(modalProductSelections);
    setSelectedProducts(modalProductSelections);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setModalProductSelections([]);
    setIsModalOpen(false);
  };

  const handleClearSelections = () => {
    setConfirmedProducts([]);
    setSelectedProducts([]);
    setModalProductSelections([]);
  };

  const renderProductItem = (product: Product) => (
    <div key={product.id.toString()} className="product-item">
      <input
        className="checkbox-effect-1"
        type="checkbox"
        id={`product-${product.id}`}
        checked={modalProductSelections.includes(product.id)}
        onChange={(e) => handleProductChange(e.target.checked, product.id)}
      />
      <label htmlFor={`product-${product.id}`} className="checkbox-label">
        <span className="checkbox-custom"></span>{" "}
        {/* This is for custom checkbox styling */}
        {product.name}: ${product.value.toFixed(2)}
      </label>
    </div>
  );

  const formattedTotalValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalProductValue);

  return (
    <>
      <Tooltip
        title={selectedProductNames.join(", ") || "No Products Are Selected"}
        componentsProps={{
          tooltip: {
            sx: {
              typography: "body2",
              backgroundColor: "rgba(97, 97, 97, 0.9)",
              color: "#fff",
              boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.1)",
              fontSize: "0.875rem",
              borderRadius: "4px",
              padding: "8px 16px",
            },
          },
        }}
      >
        <TextField
          sx={{
            width: "350px",
            "& .MuiInputBase-input": { cursor: "pointer" },
          }}
          label="Total Product Value"
          type="text"
          value={formattedTotalValue}
          variant="outlined"
          InputProps={{ readOnly: true }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Tooltip>

      <div className="button-container">
        <Button
          variant="contained"
          color="primary"
          onClick={handleModalOpen}
          sx={{
            width: "40%",
          }}
        >
          Select Products
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClearSelections}
          sx={{
            width: "40%",
          }}
        >
          Clear
        </Button>
      </div>

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box sx={modalStyle}>
          <h2>Select Products</h2>
          <Grid container spacing={2}>
            {" "}
            {/* This creates the grid container */}
            {PRODUCTS.map((product) => (
              <Grid item xs={6} key={product.id}>
                {" "}
                {/* This creates two columns */}
                {renderProductItem(product)}
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2, // Add margin top for spacing above the buttons
              "& > *": {
                flex: "1 1 auto",
                margin: "5px",
              },
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmSelection}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleModalClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Products;
