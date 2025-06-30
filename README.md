Steps to set up the project.
1. Unzip the file.
2. Open the folder in VS Code or any terminal.
3. Run the backend:

 cd backend
npm install
node index.js

4. In a new terminal, run the frontend:

cd frontend
npm install
npm start

Backend runs on: http://localhost:5000

Frontend runs on: http://localhost:3000


1️⃣ How My Code Works (Detailed)
--------------------------------
- The system has two parts: Backend (Node.js + Express) and Frontend (React + Tailwind CSS).
- Customers use the Customer Page to place an order by entering a product name and amount.
- This sends a POST request to /order on the backend.
- When an order is created, it gets a status of 'waiting'. An 8-second timer runs on the backend — if not confirmed, the order status changes to 'failed' automatically.
- The Merchant Dashboard has:
  - A Merchant Settings section to choose a payment method (Mobile/Card/Bank) and enter config values (like provider).
  - These are saved via /merchant.
  - An Orders List that shows all orders. Each order has a Confirm button. If the merchant clicks Confirm in time, the status becomes 'paid'.
- The frontend uses React Router to separate Customer and Merchant pages. The orders list auto-updates every few seconds.

2️⃣ How the System Supports Multiple Merchants with Unique Configs
------------------------------------------------------------------
- Each merchant saves their own settings using the /merchant endpoint.
- The config is stored in a merchantConfig object.
- In a real production system, each merchant would have a unique ID and their own config stored in a database.
- This makes it possible for each merchant to have a different payment method, provider, or extra options.

3️⃣ How I Would Extend It to Support Different Commission Rates per Merchant
----------------------------------------------------------------------------
- Add a commissionRate field to the merchant config.
- When saving settings, the merchant can set their commission percentage.
- When creating an order, the backend calculates:
  finalAmount = totalAmount - (totalAmount * commissionRate)
- This way each merchant can have a unique commission.
- In a full system, you can store this logic in the database linked to the merchant ID.

4️⃣ How I Would Scale This If Ghala Had 10,000+ Merchants
---------------------------------------------------------
- Use a real database (PostgreSQL, MongoDB) instead of in-memory objects.
- Add authentication so each merchant has their own account and settings.
- Use a message queue (RabbitMQ) for async tasks like payment processing.
- Use WebSockets to push order updates in real-time instead of polling.
- Deploy on a cloud server with a load balancer and autoscaling.
- Use role-based access control to keep customer/merchant/admin actions separate.
- Secure the payment flow with a real payment gateway.
