import React from "react";
import TextField from "@mui/material/TextField";
import { calculateTotal } from "../calculateTotal";
import GaugeChartLTV from "./GaugeLtv";

type SummaryProps = {
  sellingPrice: number | null;
  tradeValue: number | null;
  tradePayoff: number | null;
  downPayment: number | null;
  salesTax: number | null;
  totalProductValue: number | null;
  docFee: number | null;
  governmentFees: number | null;
  retailPrice: number | null;
  financeAmount: number | null;
};

const Summary: React.FC<SummaryProps> = ({
  sellingPrice,
  tradeValue,
  tradePayoff,
  downPayment,
  salesTax,
  totalProductValue,
  docFee,
  governmentFees,
  retailPrice,
  financeAmount,
}) => {
  const total = calculateTotal(
    sellingPrice,
    tradeValue,
    tradePayoff,
    salesTax,
    totalProductValue,
    docFee,
    governmentFees,
  );

  console.log("Received Retail Price in Summary:", retailPrice);

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(total);

  return (
    <>
      <TextField
        label="Total"
        value={formattedTotal}
        InputProps={{ readOnly: true }}
        variant="outlined"
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
          },
          "& .MuiOutlinedInput-root": {
            height: "5rem",
          },
        }}
      />
      <GaugeChartLTV
        financeAmount={financeAmount}
        retailPrice={retailPrice}
        downPayment={downPayment}
      />
    </>
  );
};

export default Summary;
