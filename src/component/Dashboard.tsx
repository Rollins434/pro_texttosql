import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../store/hook";

import SuccessFailureChart from "../chart/SuccessFailureChart";
import { fetchInsights } from "../store/chartSlice";



const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { successFailureData, responseTimeData, loading, error } = useAppSelector(
    (state) => state.charts
  );
  console.log(successFailureData)

  useEffect(() => {
    // Fetch the insights data when the component mounts
    dispatch(fetchInsights());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error}</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ width: "500px", height: "400px" }}>
        <h3>Success vs Failure Rate</h3>
        <SuccessFailureChart success={successFailureData.success} failure={successFailureData.failure} />
      </div>
      {/* <div style={{ width: "500px", height: "400px" }}>
        <h3>Query Response Time Analysis</h3>
        <ResponseTimeChart responseTimes={responseTimeData} />
      </div> */}
    </div>
  );
};

export default Dashboard;
