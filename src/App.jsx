import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Terminal from "./pages/Terminal";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/terminal" element={<Terminal />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
