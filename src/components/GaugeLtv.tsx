import React from "react";
import GaugeChart from "react-gauge-chart";

type GaugeChartLTVProps = {
  financeAmount: number | null; // Expected to be received from FinanceCalculator
  retailPrice: number | null; // Expected to be received from InputField
};

const GaugeChartLTV: React.FC<GaugeChartLTVProps> = ({
  financeAmount,
  retailPrice,
}) => {
  // Calculate the LTV percentage
  const calculateLTV = (
    financeAmount: number | null,
    retailPrice: number | null,
  ): number => {
    if (!financeAmount || !retailPrice || retailPrice === 0) {
      return 0; // Return 0 if values are not provided or retailPrice is 0 to avoid division by zero
    }
    return (financeAmount / retailPrice) * 100;
  };

  const ltv = calculateLTV(financeAmount, retailPrice);

  const data = {
    value: ltv,
    minValue: 0,
    maxValue: 150,
    label: "LTV Ratio",
  };

  return (
    <GaugeChart
      id="gauge-chart"
      data={data}
      options={{
        size: 200,
        minSize: 20,
        maxSize: 300,
        lineWidth: 15,
        fontFamily: "Arial",
        fontSize: 18,
        labelColor: "#333",
        backgroundColor: "#eee",
      }}
    />
  );
};

export default GaugeChartLTV;
