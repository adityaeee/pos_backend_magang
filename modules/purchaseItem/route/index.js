const express = require('express');
const { mkcol } = require('../../products/route');

const router = express.Router();

const {
    getPurchaseItem,
    getPurchaseItemById,
    createPurchaseItem,
    updatePurchaseItemById,
    deletePurchaseItemById
} = require('../controller/index');

router.get('/', getPurchaseItem);
router.get('/:id', getPurchaseItemById);
router.post('/', createPurchaseItem);
router.put('/:id', updatePurchaseItemById);
router.delete('/:id', deletePurchaseItemById);

module.exports = router;