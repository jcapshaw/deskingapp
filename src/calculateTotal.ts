export const calculateTotal = (
  sellingPrice: number | null,
  tradeValue: number | null,
  tradePayoff: number | null,
  effectiveTax: number | null,
  totalProductValue: number | null,
  docFee: number | null,
  governmentFees: number | null
) => {
  return (
    (sellingPrice || 0) -
    (tradeValue || 0) +
    (tradePayoff || 0) +
    (effectiveTax || 0) +
    (totalProductValue || 0) +
    (docFee || 0) +
    (governmentFees || 0)
  );
};
