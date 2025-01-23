// src/components/SuccessFailureChart.tsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface Props {
  success: number;
  failure: number;
}

const SuccessFailureChart: React.FC<Props> = ({ success, failure }) => {
  const data = [
    { name: "Success", value: success },
    { name: "Failure", value: failure },
  ];

  const COLORS = ["#28a745", "#dc3545"]; // Success and Failure colors

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius={150}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default SuccessFailureChart;
