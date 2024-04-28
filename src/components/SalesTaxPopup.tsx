// SalesTaxPopup.tsx
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './SalesTaxPopup.css';

interface Props {
  onClose: (totalTaxRate: number, flatTaxFee: number) => void;
}

const SalesTaxPopup: React.FC<Props> = ({ onClose }) => {
  const [stateTax, setStateTax] = useState<number>(5.6);
  const [countyTax, setCountyTax] = useState<number>(1.1);
  const [cityTax, setCityTax] = useState<number>(1.4);
  const [flatTaxFee, setFlatTaxFee] = useState<number>(20.0);

  const handleSubmit = () => {
    const totalTaxRate = stateTax + countyTax + cityTax;
    onClose(totalTaxRate, flatTaxFee);
  };

  return (
    <div className="popup">
      <TextField
        label="State Tax Rate"
        type="number"
        value={stateTax}
        onChange={(e) => setStateTax(parseFloat(e.target.value))}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="County Tax Rate"
        type="number"
        value={countyTax}
        onChange={(e) => setCountyTax(parseFloat(e.target.value))}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="City Tax Rate"
        type="number"
        value={cityTax}
        onChange={(e) => setCityTax(parseFloat(e.target.value))}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Flat Tax Fee"
        type="number"
        value={flatTaxFee}
        onChange={(e) => setFlatTaxFee(parseFloat(e.target.value))}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSubmit}
        sx={{ marginTop: 1 }}
        className="enter-sales-tax-button"
      >
        Submit
      </Button>
    </div>
  );
}

export default SalesTaxPopup;