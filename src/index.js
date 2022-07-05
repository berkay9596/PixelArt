import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DesoProvider } from "./context/DesoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DesoProvider>
    <App />
  </DesoProvider>
);
