import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";
import { PersistGate } from 'redux-persist/integration/react';
import  { store, persistor } from "./store/store.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> {/* Wrap with PersistGate */}
      <App />
    </PersistGate>
    </Provider>
  </StrictMode>
);
