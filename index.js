const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

// ✅ Middleware
app.use(cors({
  origin: '*', // or set this to your frontend URL e.g. "https://caesars-fruit-frontend.vercel.app"
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.get('/', (req, res) => {
  res.send("Caesar's Fruit backend is running 🍎🍌🍇");
});

const itemRoutes = require('./routes/itemroute');
const saleRoutes = require('./routes/saleroute');
const supplyRoutes = require('./routes/supplyroute');
const purchaseRoutes = require('./routes/purchaseroute');

app.use('/api/item', itemRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/supplies', supplyRoutes);
app.use('/api/purchase', purchaseRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running locally at http://localhost:${PORT}`);
});
