import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface InsightData {
  success: number;
  failure: number;
  response_times: number[];
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

      const data: InsightData = await response.json();
      console.log("Data",data)
      return data;
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
        (state, action: PayloadAction<InsightData>) => {
          state.loading = false;
          const { success, failure, response_times } = action.payload;
          state.successFailureData = { success, failure };
          state.responseTimeData = response_times;
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
