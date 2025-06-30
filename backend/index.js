const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let merchantConfig = {};
let orders = [];
let currentOrderId = 1;

// Save Merchant Settings
app.post("/merchant", (req, res) => {
  merchantConfig = req.body;
  res.json({ message: "Settings saved", config: merchantConfig });
});

// Get Merchant Settings
app.get("/merchant", (req, res) => {
  res.json(merchantConfig);
});

// Customer places order
app.post("/order", (req, res) => {
  const { product, total } = req.body;
  const newOrder = {
    id: currentOrderId++,
    product,
    total,
    status: "waiting"
  };
  orders.push(newOrder);

  // Auto fail in 8 sec if not confirmed
  setTimeout(() => {
    if (newOrder.status === "waiting") {
      newOrder.status = "failed";
    }
  }, 8000);

  res.json({ message: "Order placed", order: newOrder });
});

// Merchant gets orders
app.get("/orders", (req, res) => {
  res.json(orders);
});

// Merchant confirms order
app.post("/confirm/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find(o => o.id === orderId);
  if (!order) return res.status(404).json({ error: "Order not found" });

  if (order.status === "waiting") {
    order.status = "paid";
    res.json({ message: "Order confirmed" });
  } else {
    res.status(400).json({ message: "Cannot confirm: already processed" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
