import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import HomePage from "./components/HomePage";
import InputField from "./components/InputField";
import GaugeChartLTV from "./components/GaugeLtv";

function App() {
  const [retailPrice, setRetailPrice] = useState<number | null>(null);
  const [financeAmount, setFinanceAmount] = useState<number | null>(null);

  const handleRetailPriceChange = (newPrice: number) =>
    setRetailPrice(newPrice);
  const handleFinanceAmountChange = (newAmount: number) =>
    setFinanceAmount(newAmount);

  const [downPayment, setDownPayment] = useState<number | null>(null);

  const calculateLTV = () => {
    if (retailPrice && financeAmount && retailPrice !== 0) {
      return (financeAmount / retailPrice) * 100;
    }
    return 0;
  };

  return (
    <Router>
      <div className="grid container">
        <h1 className="grid-item">Desking Application</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/input"
            element={
              <InputField
                onRetailPriceChange={handleRetailPriceChange}
                onFinanceAmountChange={handleFinanceAmountChange}
              />
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/ltv"
            element={
              <GaugeChartLTV
                financeAmount={financeAmount}
                retailPrice={retailPrice}
                downPayment={downPayment}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
