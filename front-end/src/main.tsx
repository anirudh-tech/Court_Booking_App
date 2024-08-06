import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react"; // For React integration

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster position="top-center" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
