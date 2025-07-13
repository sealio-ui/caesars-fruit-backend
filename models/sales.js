const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
      quantity: Number
    }
  ],
  bundles: [
    {
      name: String,
      components: [{ name: String, quantity: Number }],
      quantity: Number
    }
  ],
  totalPrice: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sale', saleSchema);
