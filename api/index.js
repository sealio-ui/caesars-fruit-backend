const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const connectDB = require('../config/db');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to MongoDB
connectDB();

// ✅ Add this root route!
app.get('/', (req, res) => {
  res.send("🍇 Caesar's Fruit backend is working!");
});

// ✅ Routes
const itemRoutes = require('../routes/itemroute');
const saleRoutes = require('../routes/saleroute');
const supplyRoutes = require('../routes/supplyroute');
const purchaseRoutes = require('../routes/purchaseroute');

app.use('/api/item', itemRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/supplies', supplyRoutes);
app.use('/api/purchase', purchaseRoutes);

app.get('/api', (req, res) => {
  res.send("🍇 Caesar's Fruit backend (Vercel Serverless)");
});

// ✅ Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);


