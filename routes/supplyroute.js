const express = require('express');
const router = express.Router();
const supplyController = require('../controllers/supplycontrol');

router.get('/', supplyController.getSupplies);
router.post('/', supplyController.createSupply);
router.delete('/all', supplyController.deleteAllSupplies);
router.delete('/:id', supplyController.deleteSupplyById);


module.exports = router;
