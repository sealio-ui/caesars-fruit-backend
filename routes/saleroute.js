const express = require('express');
const router = express.Router();
const saleController = require('../controllers/salecontrol');

router.get('/', saleController.getSales);
router.post('/', saleController.createSale);
router.delete('/all', saleController.deleteAllSales); 
router.delete('/all', saleController.deleteAllSales); 

module.exports = router;
