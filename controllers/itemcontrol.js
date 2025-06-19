// Format function
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};

// Import Fruit model
const Fruit = require('../models/Item');

// Get all fruits
exports.getFruits = async (req, res) => {
  try {
    const fruits = await Fruit.find();
    const formattedFruits = fruits.map(fruit => ({
      ...fruit.toObject(),
      priceFormatted: formatRupiah(fruit.price),
    }));
    res.json(formattedFruits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new fruit
exports.createFruit = async (req, res) => {
  try {
    const { name, price, type, quantityAvailable } = req.body;
    const fruit = new Fruit({ name, price, type, quantityAvailable });
    await fruit.save();

    const response = {
      ...fruit.toObject(),
      priceFormatted: formatRupiah(fruit.price),
    };

    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update fruit
exports.updateFruit = async (req, res) => {
  try {
    const fruit = await Fruit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(fruit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete fruit
exports.deleteFruit = async (req, res) => {
  try {
    await Fruit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Fruit deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
