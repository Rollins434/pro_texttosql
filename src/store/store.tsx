import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import queriesReducer from './queriesSlice'; // Import your queries slice

// Persist configurations for auth and queries
const authPersistConfig = {
  key: 'auth',
  storage,
};

const queriesPersistConfig = {
  key: 'queries',
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  queries: persistReducer(queriesPersistConfig, queriesReducer),
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
