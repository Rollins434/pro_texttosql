// src/chart/ResponseTimeChart.tsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Props {
  responseTimes: number[];
}

const ResponseTimeChart: React.FC<Props> = ({ responseTimes }) => {
  const data = responseTimes.map((time, index) => ({
    name: `Query ${index + 1}`,
    responseTime: time,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="responseTime" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ResponseTimeChart;
