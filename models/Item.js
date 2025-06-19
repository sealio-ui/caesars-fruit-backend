const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true }, // per unit or bundle
  type: { type: String, enum: ['fruit', 'bundle','package'], default: 'fruit' },
  quantityAvailable: { type: Number, default: 0 }
});

module.exports = mongoose.models.Item || mongoose.model('Item', fruitSchema);