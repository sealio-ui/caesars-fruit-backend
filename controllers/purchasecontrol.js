const Item = require('../models/Item');
const Purchase = require('../models/purchase');
exports.getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().populate('item');

    const formattedPurchases = purchases.map((purchase) => ({
      _id: purchase._id,
      item: purchase.item,
      quantity: purchase.quantity,
      unitPrice: purchase.unitPrice,
      amount: purchase.amount,
      amountFormatted: new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(purchase.amount),
      supplier: purchase.supplier,
      description: purchase.description,
      date: purchase.date,
    }));

    res.json(formattedPurchases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createPurchase = async (req, res) => {
  try {
    const { item, quantity, unitPrice, supplier, description } = req.body;

    const itemObj = await Item.findById(item);
    if (!itemObj) return res.status(404).json({ error: 'Item not found' });

    const amount = unitPrice * quantity;

    const purchase = new Purchase({
      item,
      quantity,
      unitPrice,
      amount,
      supplier,
      description
    });

    await purchase.save();

    itemObj.quantityAvailable += quantity;
    await itemObj.save();

    const formatted = {
      ...purchase.toObject(),
      unitPriceFormatted: new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(unitPrice),
      amountFormatted: new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(amount)
    };

    res.status(201).json(formatted);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.deletePurchaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Purchase.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Purchase not found' });
    }
    res.json({ message: 'Purchase deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteAllPurchases = async (req, res) => {
  try {
    await Purchase.deleteMany({});
    res.json({ message: 'All purchases deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};