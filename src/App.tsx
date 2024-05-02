import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
import HomePage from "./components/HomePage";
import InputField from "./components/InputField";
import GaugeChartLTV from "./components/GaugeLtv";

function App() {
  const [retailPrice, setRetailPrice] = useState(null);
  const [financeAmount, setFinanceAmount] = useState(null);

  const handleRetailPriceChange = (newPrice: number) =>
    setRetailPrice(newPrice);
  const handleFinanceAmountChange = (newAmount: number) =>
    setFinanceAmount(newAmount);

  const calculateLTV = () => {
    return retailPrice !== 0 ? (financeAmount / retailPrice) * 100 : 0;
  };

  return (
    <Router>
      <div className="grid container">
        <h1 className="grid-item">Desking Application</h1>
        <Routes>
          <Route path="/" element={<HomePage className="grid-item" />} />
          <Route
            path="/input"
            element={
              <InputField
                className="grid-item"
                onRetailPriceChange={handleRetailPriceChange}
                onFinanceAmountChange={handleFinanceAmountChange}
              />
            }
          />
          <Route path="/login" element={<LoginForm className="grid-item" />} />
          <Route
            path="/ltv"
            element={
              <GaugeChartLTV
                className="grid-item"
                financeAmount={financeAmount}
                retailPrice={retailPrice}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
