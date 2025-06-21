const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
app.get('/', (req, res) => {
  res.send("Caesar's Fruit backend is running on Vercel 🍎🍌🍇");
});

const itemRoutes = require('../routes/itemroute');
const saleRoutes = require('../routes/saleroute');
const supplyRoutes = require('../routes/supplyroute');
const purchaseRoutes = require('../routes/purchaseroute');

app.use('/api/item', itemRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/supplies', supplyRoutes);
app.use('/api/purchase', purchaseRoutes);

// ✅ Export for Vercel Serverless
module.exports = app;
module.exports.handler = serverless(app);

