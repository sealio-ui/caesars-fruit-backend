const Sale = require('../models/sales');
const Item = require('../models/Item');

exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find().lean();

    const formatted = sales.map(sale => ({
      ...sale,
      totalPriceFormatted: new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(sale.totalPrice)
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSale = async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No items provided' });
    }

    let totalPrice = 0;
    const components = [];
    let isOnlyCornucopia = true;
    const nameSummary = [];

    for (const entry of items) {
      const { itemName, quantity } = entry;

      if (itemName === 'Cornucopia') {
        const grape = await Item.findOne({ name: 'Anggur' });
        const apple = await Item.findOne({ name: 'Apel' });
        const strawberry = await Item.findOne({ name: 'Stroberi' });
        const basket = await Item.findOne({ name: 'Basket' });

        if (!grape || grape.quantityAvailable < 3 * quantity ||
            !apple || apple.quantityAvailable < 2 * quantity ||
            !strawberry || strawberry.quantityAvailable < 1 * quantity ||
            !basket || basket.quantityAvailable < 1 * quantity) {
          return res.status(400).json({ error: 'Insufficient stock for Cornucopia' });
        }

        grape.quantityAvailable -= 3 * quantity;
        apple.quantityAvailable -= 2 * quantity;
        strawberry.quantityAvailable -= 1 * quantity;
        basket.quantityAvailable -= 1 * quantity;

        await grape.save();
        await apple.save();
        await strawberry.save();
        await basket.save();

        totalPrice += (
          grape.price * 3 +
          apple.price * 2 +
          strawberry.price * 1 +
          basket.price * 1
        ) * quantity * 0.8;

        // ✅ Don't add Cornucopia itself to the breakdown
        components.push({ name: 'Anggur', quantity: 3 * quantity });
        components.push({ name: 'Apel', quantity: 2 * quantity });
        components.push({ name: 'Stroberi', quantity: 1 * quantity });
        components.push({ name: 'Basket', quantity: 1 * quantity });

        nameSummary.push(`${quantity}x Cornucopia`);
      } else {
        isOnlyCornucopia = false;

        const item = await Item.findOne({ name: itemName });
        if (!item || item.quantityAvailable < quantity) {
          return res.status(400).json({ error: `Insufficient stock for ${itemName}` });
        }

        item.quantityAvailable -= quantity;
        await item.save();

        totalPrice += item.price * quantity;
        components.push({ name: itemName, quantity });

        nameSummary.push(`${quantity}x ${itemName}`);
      }
    }

    const sale = new Sale({
      totalPrice,
      quantity: components.reduce((sum, c) => sum + c.quantity, 0),
      components,
      bundleName: isOnlyCornucopia
        ? 'Cornucopia'
        : `Items Sold (${nameSummary.join(', ')})`
    });

    await sale.save();

    const formatted = {
      ...sale.toObject(),
      totalPriceFormatted: new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(totalPrice)
    };

    res.status(201).json(formatted);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Sale.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.json({ message: 'Sale deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAllSales = async (req, res) => {
  try {
    await Sale.deleteMany();
    res.json({ message: 'All sales deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
