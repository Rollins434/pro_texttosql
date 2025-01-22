import React, { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface StatData {
  date: string;
  successCount: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<StatData[]>([]);
  
  // Mock data for the chart
  const fetchStats = () => {
    // Replace this with your actual API call to fetch statistics
    const data = [
      { date: "2025-01-01", successCount: 100 },
      { date: "2025-01-02", successCount: 150 },
      { date: "2025-01-03", successCount: 120 },
      { date: "2025-01-04", successCount: 200 },
      { date: "2025-01-05", successCount: 180 },
    ];
    setStats(data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      
      {/* Success Count Chart */}
      <div className="w-full max-w-4xl">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={stats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="successCount" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
