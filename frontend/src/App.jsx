import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Customer from "./Customer";
import Merchant from "./Merchant";

export default function App() {
  return (
    <Router>
      <div className="p-6 flex gap-4 bg-gray-100">
        <Link to="/customer" className="text-blue-600 underline">Customer Page</Link>
        <Link to="/merchant" className="text-blue-600 underline">Merchant Dashboard</Link>
      </div>
      <Routes>
        <Route path="/customer" element={<Customer />} />
        <Route path="/merchant" element={<Merchant />} />
      </Routes>
    </Router>
  );
}
