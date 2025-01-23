import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import queriesReducer from './queriesSlice'; // Import your queries slice
import chartReducer from './chartSlice'; // Import chart slice

// Persist configurations for auth, queries, and charts
const authPersistConfig = {
  key: 'auth',
  storage,
};

const queriesPersistConfig = {
  key: 'queries',
  storage,
};

const chartPersistConfig = {
  key: 'charts',
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  queries: persistReducer(queriesPersistConfig, queriesReducer),
  charts: persistReducer(chartPersistConfig, chartReducer), // Add chartReducer here
});

// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
