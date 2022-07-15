import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DesoProvider } from "./context/DesoContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LeaderBoard from "./components/LeaderBoard";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <DesoProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/leaderboard" element={<LeaderBoard />} />
      </Routes>
      <Footer />
    </DesoProvider>
  </BrowserRouter>
);
