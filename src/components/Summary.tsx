import React from 'react';
import TextField from '@mui/material/TextField';
import { calculateTotal } from '../calculateTotal';

type SummaryProps = {
  sellingPrice: number | null;
  tradeValue: number | null;
  tradePayoff: number | null;
  salesTax: number | null;
  totalProductValue: number | null;
  docFee: number | null;
  governmentFees: number | null;
};

  const Summary: React.FC<SummaryProps> = ({ sellingPrice, tradeValue, tradePayoff, salesTax, totalProductValue, docFee, governmentFees }) => {
  
  const total = calculateTotal(sellingPrice, tradeValue, tradePayoff, salesTax, totalProductValue, docFee, governmentFees);

  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(total);

  return (
    <div className="summary-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <TextField
        label="Total"
        value={formattedTotal}
        InputProps={{ readOnly: true }}
        variant="outlined"
        sx={{
          '& .MuiInputBase-input': {
            fontSize: '1.5rem', // Adjust the font size as needed
            fontWeight: 'bold',
            textAlign: 'center', // Make the font bold
          },
          '& .MuiOutlinedInput-root': {
             height: '5rem', // Adjust the height of the text field as needed
          },
  }}
/>   
    </div>
  );
};
    
    export default Summary;
