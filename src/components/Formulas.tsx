import React, { useState } from "react";
import GaugeChartLTV from "./GaugeLtv";
import FinanceCalculator from "./FinanceCalculator";
import InputField from "./InputField";

const MainComponent = () => {
  const [financeAmount, setFinanceAmount] = useState(null);
  const [retailPrice, setRetailPrice] = useState(null);

  // Function to handle changes from FinanceCalculator
  const handleFinanceAmountChange = (value) => {
    setFinanceAmount(value);
  };

  // Function to handle changes from InputField
  const handleRetailPriceChange = (value) => {
    setRetailPrice(value);
  };

  return (
    <div>
      <FinanceCalculator onChange={handleFinanceAmountChange} />
      <InputField onChange={handleRetailPriceChange} />
      <GaugeChartLTV financeAmount={financeAmount} retailPrice={retailPrice} />
    </div>
  );
};

export default MainComponent;
