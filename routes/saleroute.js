const express = require('express');
const router = express.Router();
const saleController = require('../controllers/salecontrol');

router.get('/', saleController.getSales);
router.post('/', saleController.createSale);
router.delete('/all', saleController.deleteAllSales); 
router.delete('/all', saleController.deleteAllSales); 
router.delete('/sales', async (req, res) => {
  try {
    await Sale.deleteMany({});
    res.json({ message: 'Sales cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear sales' });
  }
});

module.exports = router;
