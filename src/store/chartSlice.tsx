import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface InsightData {
  success: number;
  failure: number;
  response_times: number[];
}

interface ApiResponse {
  api_usage_metrics_text: {
    success: number;
    failure: number;
    start_timestamp: string;
    end_timestamp: string;
  }[];
  api_usage_metrics_sql: any[]; // Assuming you'll handle SQL data if it appears
}

interface ChartState {
  successFailureData: { success: number; failure: number };
  responseTimeData: number[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ChartState = {
  successFailureData: { success: 0, failure: 0 },
  responseTimeData: [],
  loading: false,
  error: null,
};

// Async thunk to fetch insights data
export const fetchInsights = createAsyncThunk(
  "charts/fetchInsights",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8080/all/insights", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch insights data");
      }

      const data: ApiResponse = await response.json();
      console.log("Data", data);

      // Process the data to extract what you need for charts
      const successFailureData = { success: 0, failure: 0 };
      const responseTimes: number[] = [];

      // Process the api_usage_metrics_text to extract success/failure and response time
      data.api_usage_metrics_text.forEach((entry) => {
        successFailureData.success += entry.success;
        successFailureData.failure += entry.failure;

        // Calculate the response time based on start and end timestamps
        const startTime = new Date(entry.start_timestamp).getTime();
        const endTime = new Date(entry.end_timestamp).getTime();
        const responseTime = (endTime - startTime) / 1000; // Response time in seconds
        responseTimes.push(responseTime);
      });

      // Return the processed data
      return {
        successFailureData,
        responseTimes,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const chartSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {
    clearChartData: (state) => {
      state.successFailureData = { success: 0, failure: 0 };
      state.responseTimeData = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInsights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchInsights.fulfilled,
        (state, action: PayloadAction<{ successFailureData: { success: number; failure: number }; responseTimes: number[] }>) => {
          state.loading = false;
          const { successFailureData, responseTimes } = action.payload;
          state.successFailureData = successFailureData;
          state.responseTimeData = responseTimes;
        }
      )
      .addCase(fetchInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearChartData } = chartSlice.actions;

export default chartSlice.reducer;
