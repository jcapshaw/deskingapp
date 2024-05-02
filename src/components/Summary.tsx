import React from "react";
import TextField from "@mui/material/TextField";
import { calculateTotal } from "../calculateTotal";
import GaugeChartLTV from "./GaugeLtv";

type SummaryProps = {
  sellingPrice: number | null;
  tradeValue: number | null;
  tradePayoff: number | null;
  salesTax: number | null;
  totalProductValue: number | null;
  docFee: number | null;
  governmentFees: number | null;
  retailPrice: number | null; // Assume added for the example
  financeAmount: number | null; // Assume added for the example
};

const Summary: React.FC<SummaryProps> = ({
  sellingPrice,
  tradeValue,
  tradePayoff,
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

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(total);

  const percentage =
    retailPrice && financeAmount ? (retailPrice / financeAmount) * 100 : 0;

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
        value={percentage}
        minValue={0}
        maxValue={200}
        lineWidth={2}
        label={`Percentage: ${percentage.toFixed(2)}%`}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </>
  );
};

export default Summary;
