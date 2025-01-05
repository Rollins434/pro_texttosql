// store/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  role: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  role: null,
  loading: false,
  error: null,
};

// Dummy users for testing
const dummyUsers = [
  { username: 'admin', password: 'admin123', role: 'Admin' },
  { username: 'user', password: 'user123', role: 'User' },
];

// Async thunk for login

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    // Simulate an API call with a delay
    return new Promise<{ role: string }>((resolve, reject) => {
      setTimeout(() => {
        const user = dummyUsers.find(
          (u) => u.username === credentials.username && u.password === credentials.password
        );

        if (user) {
          resolve({ role: user.role });
        } else {
          reject(rejectWithValue('Invalid username or password'));
        }
      }, 1000); // Simulate a 1 second delay
    });
  }
);

// Async thunk for registration (if needed)
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: { username: string; password: string; role: string }, { rejectWithValue }) => {
    // Simulate registration logic here if needed
    try {
      // You can add logic here to handle registration
      return Promise.resolve(); // Just resolve for now
    } catch (error) {
      return rejectWithValue('Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.role = action.payload.role; // Set the role from the payload
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Handle error message
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        // Optionally handle post-registration logic here
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Handle registration error message
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
