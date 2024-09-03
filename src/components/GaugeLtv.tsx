import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

interface GaugeChartLTVProps {
  financeAmount: number | null;
  retailPrice: number | null;
  downPayment: number | null;
}

const GaugeChartLTV: React.FC<GaugeChartLTVProps> = ({
  financeAmount,
  retailPrice,
  downPayment,
}) => {
  const calculateLTV = (
    financeAmount: number | null,
    retailPrice: number | null,
    downPayment: number | null
  ): number => {
    if (!retailPrice || retailPrice === 0 || !financeAmount) return 0;
    const actualFinanceAmount = financeAmount - (downPayment ?? 0);
    return (actualFinanceAmount / retailPrice) * 100;
  };

  const ltv = calculateLTV(financeAmount, retailPrice, downPayment);

  const getFill = (ltv: number): string => {
    if (ltv >= 130) return "#FF0000"; // Red
    if (ltv >= 116) return "#FFA500"; // Orange
    if (ltv >= 100) return "#FFFF00"; // Yellow
    return "#008000"; // Green
  };

  const getLTVStatus = (ltv: number): string => {
    if (ltv >= 130) return "Not Eligible";
    if (ltv >= 116) return "Poor";
    if (ltv >= 100) return "Good";
    return "Preferred";
  };

  const data = [{ name: "LTV", value: ltv, fill: getFill(ltv) }];

  return (
    <div
      style={{
        width: "100%",
        height: "250px",
        backgroundColor: "black",
        textAlign: "center",
      }}
    >
      <ResponsiveContainer width="100%" height="90%">
        <RadialBarChart
          innerRadius="60%"
          outerRadius="90%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar dataKey="value" background={{ fill: "#eee" }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div style={{ color: "white", fontSize: "22px", paddingBottom: "20px" }}>
        LTV: {ltv.toFixed(2)}% - {getLTVStatus(ltv)}
      </div>
    </div>
  );
};

export default GaugeChartLTV;
