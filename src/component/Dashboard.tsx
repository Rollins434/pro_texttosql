import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import SuccessFailureChart from "../chart/SuccessFailureChart";
import ResponseTimeChart from "../chart/ResponseTimeChart";
import { fetchInsights } from "../store/chartSlice";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { successFailureData, responseTimeData, loading, error } = useAppSelector(
    (state) => state.charts
  );

  useEffect(() => {
    // Fetch the insights data when the component mounts
    dispatch(fetchInsights());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      {/* Success vs Failure Rate Chart */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Success vs Failure Rate</h3>
        <div className="w-full max-w-lg mx-auto">
          <SuccessFailureChart
            success={successFailureData.success}
            failure={successFailureData.failure}
          />
        </div>
      </div>

      {/* Query Response Time Analysis Chart */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Query Response Time Analysis</h3>
        <div className="w-full" style={{ height: "400px" }}>
          <ResponseTimeChart responseTimes={responseTimeData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
