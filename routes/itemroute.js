const express = require('express');
const router = express.Router();
const fruitcontrol = require('../controllers/itemcontrol');

router.get('/', fruitcontrol.getFruits);
router.post('/', fruitcontrol.createFruit);
router.put('/:id', fruitcontrol.updateFruit);
router.delete('/:id', fruitcontrol.deleteFruit);

module.exports = router;

