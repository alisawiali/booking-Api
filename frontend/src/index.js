import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SerachContextProvider } from "./context/serachContext";
import { AuthContextProvider } from "./context/authConetxt";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SerachContextProvider>
        <App />
      </SerachContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
