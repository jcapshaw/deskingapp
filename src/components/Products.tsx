import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Grid,
  Checkbox,
  Box,
  TextField,
  Tooltip,
} from "@mui/material";
import "./Products.css";

export const PRODUCTS = [
  { id: 1, name: "SmartShield", value: 899 },
  { id: 2, name: "VTR", value: 299 },
  { id: 3, name: "Window Tint", value: 599 },
  { id: 4, name: "Door/Cup Guards", value: 299 },
  { id: 5, name: "ClearBra", value: 599 },
  { id: 6, name: "VSC", value: 2999, isEditable: true },
  { id: 7, name: "GAP", value: 999, isEditable: true },
  { id: 8, name: "Maintenance", value: 999, isEditable: true },
  { id: 9, name: "Ding Shield", value: 899, isEditable: true },
  { id: 10, name: "Credit Life", value: 599, isEditable: true },
];

const Products = ({
  selectedProducts,
  setSelectedProducts,
  totalProductValue,
  setTotalProductValue,
}) => {
  const [modalProductSelections, setModalProductSelections] =
    useState(selectedProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customValues, setCustomValues] = useState({});

  const handleCustomValueChange = (productId, value) => {
    setCustomValues((prev) => ({ ...prev, [productId]: value }));
  };

  const handleProductChange = (isChecked, productId) => {
    let newSelections;
    if (isChecked) {
      newSelections = [...modalProductSelections, productId];
    } else {
      newSelections = modalProductSelections.filter((id) => id !== productId);
    }
    setModalProductSelections(newSelections);
  };

  const calculateTotal = () => {
    return modalProductSelections.reduce((acc, productId) => {
      const product = PRODUCTS.find((p) => p.id === productId);
      const customValue = customValues[productId];
      return acc + (customValue ? parseFloat(customValue) : product.value);
    }, 0);
  };

  useEffect(() => {
    if (typeof setTotalProductValue === "function") {
      const newTotal = calculateTotal();
      setTotalProductValue(newTotal);
    } else {
      console.error(
        "setTotalProductValue is not a function",
        setTotalProductValue,
      );
    }
  }, [modalProductSelections, customValues, setTotalProductValue]);

  const renderProductItem = (product) => (
    <div key={product.id.toString()} className="product-item">
      <Checkbox
        checked={modalProductSelections.includes(product.id)}
        onChange={(e) => handleProductChange(e.target.checked, product.id)}
        inputProps={{ "aria-label": "controlled" }}
      />
      <label>
        {product.name}: ${product.value.toFixed(2)}
        {product.isEditable && modalProductSelections.includes(product.id) && (
          <TextField
            type="number"
            value={customValues[product.id] || product.value}
            onChange={(e) =>
              handleCustomValueChange(product.id, e.target.value)
            }
            size="small"
            margin="normal"
            variant="outlined"
          />
        )}
      </label>
    </div>
  );

  return (
    <>
      <Tooltip title="Selected Products">
        <TextField
          value={modalProductSelections
            .map((id) => PRODUCTS.find((p) => p.id === id)?.name)
            .join(", ")}
          variant="outlined"
          fullWidth
          InputProps={{ readOnly: true }}
        />
      </Tooltip>
      <Button onClick={() => setIsModalOpen(true)}>Select Products</Button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Grid container spacing={2}>
            {PRODUCTS.map((product) => (
              <Grid item xs={12} sm={6} key={product.id}>
                {renderProductItem(product)}
              </Grid>
            ))}
          </Grid>
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        </Box>
      </Modal>
    </>
  );
};

export default Products;
