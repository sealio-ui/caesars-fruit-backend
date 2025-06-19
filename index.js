const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db'); // This already handles mongoose.connect

// Initialize app
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.get('/', (req, res) => {
  res.send("Caesar's Fruit backend is running 🍎🍌🍇");
});

const fruitRoute = require('./routes/itemroute');
app.use('/api/item', fruitRoute);

const saleRoutes = require('./routes/saleroute');
app.use('/api/sales', saleRoutes);

const supplyRoutes = require('./routes/supplyroute');
app.use('/api/supplies', supplyRoutes);

const purchaseRoutes = require('./routes/purchaseroute');
app.use('/api/purchase', purchaseRoutes);

// ✅ Start server once
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
