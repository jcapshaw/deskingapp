import React, { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import TextField from '@mui/material/TextField';
import './FinanceCalculator.css';

interface FinanceCalculatorProps {
    defaultAmountFinanced: number | null;
    downPayment?: number | null;
}

const FinanceCalculator: React.FC<FinanceCalculatorProps> = ({ defaultAmountFinanced }) => {
    const [financeAmount, setFinanceAmount] = useState<number | null>(defaultAmountFinanced);
    const [interestRate, setInterestRate] = useState<number>(8.99);
    const [term, setTerm] = useState<number>(72);
    const [localDownPayment, setLocalDownPayment] = useState<number>(0);
    const [daysUntilFirstPayment, setDaysUntilFirstPayment] = useState<number>(45);
    const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

    console.log("Received defaultAmountFinanced:", defaultAmountFinanced);
    console.log("Received downPayment:", localDownPayment);

  useEffect(() => {
    console.log("Updating financeAmount based on defaultAmountFinanced and downPayment");
    if (defaultAmountFinanced !== null) {
        setFinanceAmount(defaultAmountFinanced - (localDownPayment || 0));
    }
  }, [localDownPayment, defaultAmountFinanced]);

  useEffect(() => {
    console.log("Current financeAmount:", financeAmount);
    if (financeAmount && interestRate && term && daysUntilFirstPayment !== null) {
      const accruedInterest = (financeAmount * (interestRate / 100) / 365) * daysUntilFirstPayment;
      const adjustedFinanceAmount = financeAmount + accruedInterest;
      const r = (interestRate / 100) / 12;
      const n = term;

      const payment = (adjustedFinanceAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setMonthlyPayment(payment);
    }
  }, [financeAmount, interestRate, term, daysUntilFirstPayment]);

  return (
    <div className="grid-container">
      <div className="input-group">
        <NumericFormat
          thousandSeparator={true}
          prefix={'$'}
          customInput={TextField}
          label="Down Payment"
          value={localDownPayment || ''}
          onValueChange={(values) => {
            const { floatValue } = values;
            setLocalDownPayment(floatValue || 0);
          }}
          decimalScale={2}
          fixedDecimalScale={true}
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="input-group">
        <TextField
          label="Days Until First Payment"
          type="number"
          value={daysUntilFirstPayment.toString()}
          onChange={e => setDaysUntilFirstPayment(parseInt(e.target.value, 10))}
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="input-group">
        <NumericFormat
          thousandSeparator={true}
          prefix={'$'}
          customInput={TextField}
          label="Finance Amount"
          value={financeAmount || ''}
          decimalScale={2}
          fixedDecimalScale={true}
          InputProps={{ readOnly: true }}
          fullWidth
        />
      </div>
      <div className="input-group">
        <NumericFormat
          value={interestRate}
          onValueChange={(values) => {
            const { floatValue } = values;
            setInterestRate(floatValue || 0);
          }}
          suffix={'%'}
          decimalScale={2}
          fixedDecimalScale={true}
          customInput={TextField}
          label="Interest Rate (%)"
          variant="outlined"
          fullWidth
        />
       </div>
      <div className="input-group">
        <TextField
          label="Term (months)"
          type="number"
          value={term.toString()}
          onChange={e => setTerm(parseInt(e.target.value, 10))}
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="input-group">
        <NumericFormat
          thousandSeparator={true}
          prefix={'$'}
          customInput={TextField}
          label="Monthly Payment"
          value={monthlyPayment || ''}
          decimalScale={2}
          fixedDecimalScale={true}
          InputProps={{ readOnly: true }}
          fullWidth
        />
      </div>
    </div>
  );
};

export default FinanceCalculator;