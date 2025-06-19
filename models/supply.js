const mongoose = require('mongoose');

const supplySchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  supplier: {
    type: String,
    required: true
  },
  components: [
    {
      name: String,
      quantity: Number
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Supply', supplySchema);