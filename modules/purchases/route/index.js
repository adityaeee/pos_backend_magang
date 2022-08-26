const express = require('express');

const router = express.Router();

const {
    getPurchase,
    getPurchaseById,
    createPurchase,
    updatePurchaseById,
    deletePurchaseById
} = require('../controller/index');

router.get('/', getPurchase);
router.get('/:id', getPurchaseById);
router.post('/', createPurchase);
router.put('/:id', updatePurchaseById);
router.delete('/:id', deletePurchaseById);

module.exports = router;