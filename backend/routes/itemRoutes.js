const express = require('express');
const { getItems, createItem, deleteItem } = require('../controllers/itemController');
const router = express.Router();

router.get('/', getItems);
router.post('/', createItem);
router.delete('/:id', deleteItem);

module.exports = router;