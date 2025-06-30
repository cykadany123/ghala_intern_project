import React, { useState } from "react";

const API = "http://localhost:5000";

export default function Customer() {
  const [product, setProduct] = useState("");
  const [total, setTotal] = useState("");
  const [message, setMessage] = useState("");

  const placeOrder = async () => {
    await fetch(`${API}/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product, total })
    });
    setMessage("Order placed! Waiting for merchant confirmation...");
    setProduct("");
    setTotal("");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Customer - Place Order</h2>
      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Product name"
        value={product}
        onChange={e => setProduct(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Amount"
        value={total}
        onChange={e => setTotal(e.target.value)}
      />
      <button
        onClick={placeOrder}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Place Order
      </button>
      {message && <p className="mt-4 text-green-700">{message}</p>}
    </div>
  );
}
