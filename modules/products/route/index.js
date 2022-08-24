const express = require('express');

const router = express.Router();

const {
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    deletePruductById
} = require('../controller/index');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProductById);
router.delete('/:id', deletePruductById);

module.exports = router;