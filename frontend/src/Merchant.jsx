import React, { useEffect, useState } from "react";

const API = "http://localhost:5000";

export default function Merchant() {
  const [merchant, setMerchant] = useState({ method: "Mobile", config: "" });
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch(`${API}/orders`);
    const data = await res.json();
    setOrders(data);
  };

  const fetchSettings = async () => {
    const res = await fetch(`${API}/merchant`);
    const data = await res.json();
    if (data && data.method) setMerchant(data);
  };

  useEffect(() => {
    fetchOrders();
    fetchSettings();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  const saveMerchant = async () => {
    await fetch(`${API}/merchant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(merchant),
    });
    alert("Settings saved!");
  };

  const confirmOrder = async (id) => {
    await fetch(`${API}/confirm/${id}`, { method: "POST" });
    fetchOrders();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Merchant Settings</h2>
        <select
          className="w-full p-2 border rounded mb-2"
          value={merchant.method}
          onChange={e => setMerchant({ ...merchant, method: e.target.value })}
        >
          <option>Mobile</option>
          <option>Card</option>
          <option>Bank</option>
        </select>
        <input
          className="w-full p-2 border rounded mb-2"
          placeholder="Config (e.g., label/provider)"
          value={merchant.config}
          onChange={e => setMerchant({ ...merchant, config: e.target.value })}
        />
        <button
          onClick={saveMerchant}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Save Settings
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Orders</h2>
        <ul className="space-y-2">
          {orders.map(order => (
            <li key={order.id} className="border p-3 rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">{order.product} - ${order.total}</div>
                <div>Status: <span className={
                  order.status === "paid" ? "text-green-600" :
                  order.status === "failed" ? "text-red-600" : "text-yellow-600"
                }>{order.status}</span></div>
              </div>
              {order.status === "waiting" && (
                <button
                  onClick={() => confirmOrder(order.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Confirm
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
