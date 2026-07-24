import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { TokenProvider } from "./context/TokenContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster position="top-right" />
      <AuthProvider>
        <TokenProvider>
          <App />
        </TokenProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
