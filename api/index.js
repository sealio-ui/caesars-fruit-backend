const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('../config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Add this root route!
app.get('/', (req, res) => {
  res.send("🍇 Caesar's Fruit backend is working!");
});

const itemRoutes = require('../routes/itemroute');
const saleRoutes = require('../routes/saleroute');
const supplyRoutes = require('../routes/supplyroute');
const purchaseRoutes = require('../routes/purchaseroute');

app.use('/api/item', itemRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/supplies', supplyRoutes);
app.use('/api/purchase', purchaseRoutes);

module.exports = app;
module.exports.handler = serverless(app);
