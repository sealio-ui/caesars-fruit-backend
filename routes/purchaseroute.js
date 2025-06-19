const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchasecontrol');

router.get('/', purchaseController.getPurchases);
router.post('/', purchaseController.createPurchase);
router.delete('/all', purchaseController.deleteAllPurchases);
router.delete('/:id', purchaseController.deletePurchaseById);



module.exports = router;
