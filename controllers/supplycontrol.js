const Supply = require('../models/supply');
const Fruit = require('../models/Item');

// Get all supplies
exports.getSupplies = async (req, res) => {
  try {
    const supplies = await Supply.find().populate('item');
    res.json(supplies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new supply
exports.createSupply = async (req, res) => {
  try {
    const { itemId, quantity, supplier, components } = req.body;

    const fruit = await Fruit.findById(itemId);
    if (!fruit) return res.status(404).json({ error: 'Fruit not found' });

    const supply = new Supply({
      item: itemId,
      quantity,
      supplier,
      components: components || [] // optional field
    });

    await supply.save();

    // Increase stock
    fruit.quantityAvailable += quantity;
    await fruit.save();

    res.status(201).json(supply);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.deleteSupplyById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Supply.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Supply not found' });
    }
    res.json({ message: 'Supply deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteAllSupplies = async (req, res) => {
  try {
    await Supply.deleteMany({});
    res.json({ message: 'All supplies deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
