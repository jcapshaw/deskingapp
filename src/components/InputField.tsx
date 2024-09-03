import React, { useState, useEffect } from "react";
import { NumericFormat, NumberFormatValues } from "react-number-format";
import { ref, set } from "firebase/database";
import { database } from "./firebase.js";
import { generateUniqueId } from "./uniqueId";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SalesTaxPopup from "./SalesTaxPopup";
import { PRODUCTS } from "./Products";
import Products from "./Products";
import Summary from "./Summary";
import { calculateTotal } from "../calculateTotal";
import "./InputField.css";
import FinanceCalculator from "./FinanceCalculator";

const DEFAULT_TAX_RATE = 8.1; // Change to your default percentage
const DEFAULT_FLAT_TAX_FEE = 20; // Change to your default flat fee if any

interface InputFieldProps {
  onRetailPriceChange: (newPrice: number) => void;
  onFinanceAmountChange: (newAmount: number) => void;
}

interface ProposalData {
  retailPrice: number | null;
  discount: number | null;
  sellingPrice: number | null;
  tradeValue: number | null;
  tradePayoff: number | null;
  docFee: number;
  governmentFees: number | null;
  effectiveTax: number;
  quoteNumber?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  onRetailPriceChange,
  onFinanceAmountChange,
}) => {
  const [retailPrice, setRetailPrice] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);
  const [sellingPrice, setSellingPrice] = useState<number | null>(null);
  const [tradeValue, setTradeValue] = useState<number | null>(null);
  const [tradePayoff, setTradePayoff] = useState<number | null>(null);
  const [rebate, setRebate] = useState<number | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [totalProductValue, setTotalProductValue] = useState<number>(0);
  const [effectiveTax, setEffectiveTax] = useState<number>(0);
  const [totalTaxRate, setTotalTaxRate] = useState<number>(DEFAULT_TAX_RATE);
  const [flatTaxFee, setFlatTaxFee] = useState<number>(DEFAULT_FLAT_TAX_FEE);
  const [isTaxPopupOpen, setIsTaxPopupOpen] = useState<boolean>(false);
  const [docFee, setDocFee] = useState<number>(599);
  const [governmentFees, setGovernmentFees] = useState<number | null>(null);
  const [isTooltipModalOpen, setIsTooltipModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [uniqueId, setUniqueId] = useState<string>("");
  const [defaultAmountFinanced, setDefaultAmountFinanced] = useState<
    number | null
  >(null);

  useEffect(() => {
    const id = generateUniqueId();
    setUniqueId(id);
  }, []); // The empty array ensures this effect runs only once on mount

  const saveProposal = async (proposal: ProposalData) => {
    const uniqueId = generateUniqueId();
    proposal.quoteNumber = uniqueId;

    try {
      await set(ref(database, `proposals/${uniqueId}`), proposal);
      console.log("Proposal saved with ID:", uniqueId);
    } catch (error) {
      console.error("Error Saving Proposal:", error);
    }
  };

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipModalOpen(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipModalOpen(false);
  };

  useEffect(() => {
    const total = selectedProducts.reduce((acc, productId) => {
      const product = PRODUCTS.find((p) => p.id === productId);
      return acc + (product ? product.value : 0);
    }, 0);
    setTotalProductValue(total);
  }, [selectedProducts]);

  useEffect(() => {
    calculateEffectiveTax();
  }, [sellingPrice, tradeValue, totalTaxRate, flatTaxFee, totalProductValue]); // this effect runs whenever any of these values change

  useEffect(() => {
    const total = calculateTotal(
      sellingPrice,
      tradeValue,
      tradePayoff,
      effectiveTax,
      totalProductValue,
      docFee,
      governmentFees
    );
    setTotalAmount(total);
  }, [
    sellingPrice,
    tradeValue,
    tradePayoff,
    effectiveTax,
    totalProductValue,
    docFee,
    governmentFees,
  ]);

  const calculateEffectiveTax = () => {
    const taxableAmount =
      (sellingPrice || 0) - (tradeValue || 0) + (totalProductValue || 0);
    setEffectiveTax(taxableAmount * (totalTaxRate / 100) + flatTaxFee);
  };

  const handleRetailPriceChange = (values: NumberFormatValues) => {
    const { floatValue } = values;
    console.log("Updated Retail Price:", floatValue);
    setRetailPrice(floatValue || null);
    setSellingPrice(
      floatValue ? floatValue - (discount || 0) - (rebate || 0) : null
    );
    if (floatValue !== undefined) {
      onRetailPriceChange(floatValue);
    }
  };

  const handleDiscountChange = (values: NumberFormatValues) => {
    const { floatValue } = values;
    setDiscount(floatValue || null);
    // Calculate the new selling price
    const newSellingPrice =
      (retailPrice || 0) - (floatValue || 0) - (rebate || 0);
    setSellingPrice(newSellingPrice > 0 ? newSellingPrice : null);
  };

  const handleRebateChange = (values: NumberFormatValues) => {
    const { floatValue } = values;
    setRebate(floatValue || null);
    // Calculate the new selling price
    const newSellingPrice =
      (retailPrice || 0) - (discount || 0) - (floatValue || 0);
    setSellingPrice(newSellingPrice > 0 ? newSellingPrice : null);
  };

  const handleTradeValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setTradeValue(value);
    }
  };

  const handleTaxPopupClose = (totalTaxRate: number, flatTaxFee: number) => {
    setIsTaxPopupOpen(false);
    setTotalTaxRate(totalTaxRate);
    setFlatTaxFee(flatTaxFee);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create an object with the form data
    const proposalData = {
      retailPrice,
      discount,
      sellingPrice,
      tradeValue,
      tradePayoff,
      docFee,
      governmentFees,
      effectiveTax,
    };

    saveProposal(proposalData);
  };

  function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid-container">
        <div className="input-group">
          <NumericFormat
            thousandSeparator={true}
            prefix={"$"}
            customInput={TextField}
            label="Retail Price"
            type="text" // Change type to text to allow formatted values
            value={retailPrice !== null ? retailPrice.toString() : ""}
            onValueChange={handleRetailPriceChange}
            variant="outlined"
          />
        </div>

        <div className="input-group">
          <NumericFormat
            thousandSeparator={true}
            prefix={"$"}
            customInput={TextField}
            label="Discount"
            type="text"
            value={discount !== null ? discount.toString() : ""}
            onValueChange={handleDiscountChange}
            variant="outlined"
          />
        </div>

        <div className="input-group">
          <NumericFormat
            thousandSeparator={true}
            prefix={"$"}
            customInput={TextField}
            label="Rebate"
            type="text"
            value={rebate !== null ? rebate.toString() : ""}
            onValueChange={handleRebateChange}
            variant="outlined"
          />
        </div>

        <div className="input-group">
          <NumericFormat
            thousandSeparator={true}
            prefix={"$"}
            customInput={TextField}
            label="Selling Price"
            type="text"
            value={sellingPrice || ""}
            onValueChange={(values) =>
              setSellingPrice(values.floatValue || null)
            }
            variant="outlined"
          />
        </div>

        <div className="input-group">
          <NumericFormat
            thousandSeparator={true}
            prefix={"$"}
            customInput={TextField}
            label="Trade Value"
            type="text"
            value={tradeValue || ""}
            onValueChange={(values) => setTradeValue(values.floatValue || null)}
            variant="outlined"
          />
        </div>

        <div className="input-group">
          <NumericFormat
            thousandSeparator={true}
            prefix={"$"}
            customInput={TextField}
            label="Trade Payoff"
            type="text"
            value={tradePayoff || ""}
            onValueChange={(values) =>
              setTradePayoff(values.floatValue || null)
            }
            variant="outlined"
          />
        </div>

        <div className="input-group">
          <NumericFormat
            thousandSeparator={true}
            prefix={"$"}
            customInput={TextField}
            label="Documentation Fee"
            type="text"
            value={docFee || ""}
            onValueChange={(values) => setDocFee(values.floatValue || 0)}
            variant="outlined"
          />
        </div>

        <div className="input-group">
          <NumericFormat
            thousandSeparator={true}
            prefix={"$"}
            customInput={TextField}
            label="Government Fees"
            type="text"
            value={governmentFees !== null ? governmentFees.toString() : ""}
            onValueChange={(values) => {
              setGovernmentFees(values.floatValue || null);
            }}
            variant="outlined"
          />
        </div>

        <div className="input-group">
          <Tooltip
            title="Click to customize Sales Taxes"
            arrow
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
                input: { cursor: "pointer" },
                width: "100%",
                "& .MuiOutlinedInput-root": {},
              }}
              label="Sales Tax"
              type="text"
              value={`$${effectiveTax.toFixed(2)}`}
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
              onClick={() => setIsTaxPopupOpen(true)}
            />
          </Tooltip>
        </div>
        <div className="input-group">
          <Products
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            totalProductValue={totalProductValue}
          />
        </div>
        <Dialog
          open={isTooltipModalOpen}
          onClose={() => setIsTooltipModalOpen(false)}
        >
          <DialogTitle>Selected Products</DialogTitle>
          <DialogContent>
            <ul>
              {selectedProducts.map((productId) => {
                const product = PRODUCTS.find((p) => p.id === productId);
                return product ? (
                  <li key={productId}>
                    {product.name}: ${product.value.toFixed(2)}
                  </li>
                ) : null;
              })}
            </ul>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setIsTooltipModalOpen(false)}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* This is where the modal is conditionally rendered based on the isTaxPopupOpen state */}
        {isTaxPopupOpen && <SalesTaxPopup onClose={handleTaxPopupClose} />}

        <Summary
          sellingPrice={sellingPrice}
          tradeValue={tradeValue}
          tradePayoff={tradePayoff}
          salesTax={effectiveTax}
          totalProductValue={totalProductValue}
          docFee={docFee}
          governmentFees={governmentFees}
          retailPrice={retailPrice}
          financeAmount={totalAmount}
          downPayment={0} // Add this line or use an actual downPayment state if you have one
        />

        <div className="input-group">
          <TextField
            label="Quote ID"
            type="text"
            value={uniqueId}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            sx={{
              "& .MuiInputBase-input": {
                backgroundColor: "lightgrey", // Use any color you like
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "grey", // Optional: if you want to change the border color as well
                },
                "&:hover fieldset": {
                  borderColor: "black", // Optional: if you want to change the border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "lightgrey", // Optional: if you want to change the border color when the input is focused
                },
              },
            }}
          />
        </div>

        <FinanceCalculator defaultAmountFinanced={totalAmount} />
        <div className="proposal-button-container">
          <button type="submit" className="create-proposal-button">
            CREATE PROPOSAL
          </button>
        </div>
      </div>
    </form>
  );
};

export default InputField;
