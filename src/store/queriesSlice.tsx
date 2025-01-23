import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface ApiResponse {
  text_response: string;
  table_response: string;
  query: string;
  status: boolean;
  user_query: string;
  response_time:number;
}

interface QueriesState {
  queries: ApiResponse[]; // Array of all queries
  latestResult: ApiResponse | null; // Store the latest response
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: QueriesState = {
  queries: [],
  latestResult: null, // Initialize with null
  loading: false,
  error: null,
};

// Async thunk for making API call
// export const fetchQueryResult = createAsyncThunk(
//   "queries/fetchQueryResult",
//   async (query: string, { rejectWithValue }) => {
//     try {
//       const response = await fetch("http://localhost:8080/getData", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({
//           question: query,
//           role: "Admin",
//           model: "Gemini",
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch results");
//       }
//       const data = (await response.json()) as ApiResponse;
//       console.log("response", data);
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// Slice
// const queriesSlice = createSlice({
//   name: "queries",
//   initialState,
//   reducers: {
//     clearQuery: (state) => {
//       state.latestResult = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchQueryResult.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchQueryResult.fulfilled,
//         (state, action: PayloadAction<ApiResponse>) => {
//           state.loading = false;
//           // Set latest result
//           state.latestResult = action.payload;
//           // Add the latest result to the queries array
//           state.queries.push(action.payload);
//         }
//       )
//       .addCase(fetchQueryResult.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });
// Slice

interface QueryParams {
  query: string;
  model: string;
  schemaName?: string;  // Optional schemaName
}
// Async thunk for making API call
export const fetchQueryResult = createAsyncThunk(
  "queries/fetchQueryResult",
  async ({ query, model,schemaName }: QueryParams, { rejectWithValue }) => {
    console.log({query,model,schemaName})
    try {
      const response = await fetch("http://localhost:8080/getData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          question: query,
          role: "Admin",
          model: model,
          schemaName:schemaName  
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }
      const data = (await response.json()) as ApiResponse;
      console.log("response", data);

      // Adding the original user query to the response
      return {
        ...data,
        user_query: query, // Store the original query here
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


const queriesSlice = createSlice({
  name: "queries",
  initialState,
  reducers: {
    clearQuery: (state) => {
      state.latestResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueryResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchQueryResult.fulfilled,
        (state, action: PayloadAction<ApiResponse>) => {
          state.loading = false;
          // Set latest result
          state.latestResult = action.payload;
          // Add the latest result to the queries array, including user query
          state.queries.push(action.payload);
        }
      )
      .addCase(fetchQueryResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearQuery } = queriesSlice.actions;

export default queriesSlice.reducer;
