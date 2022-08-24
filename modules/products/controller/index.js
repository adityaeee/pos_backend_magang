const { Product } = require('../../../models');

const Validator = require('fastest-validator');
const v = new Validator();

const getProducts = async(req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async(req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        }
        res.status(200).json(product);
    } catch (error) {

    }

};

const createProduct = async(req, res) => {
    const schema = {
        id: { type: "string" },
        name: { type: "string", min: 5, max: 50 },
        buyingPrice: { convert: true, type: 'number', positive: true, },
        sellingPrice: { convert: true, type: 'number', positive: true, },
        createdBy: { type: "string", },
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(404).json(validate);
    }

    try {
        const createProduct = await Product.create(req.body);
        res.status(201).json(createProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateProductById = async(req, res) => {
    let product = await Product.findByPk(req.params.id);

    if (!product) {
        return res.status(404).json({ message: `product not found` });
    }

    const schema = {
        name: { type: "string", min: 5, max: 50, optional: true },
        buyingPrice: { convert: true, type: 'number', positive: true, optional: true },
        sellingPrice: { convert: true, type: 'number', positive: true, optional: true },
        updatedBy: { type: "string" },
    };

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(404).json(validate);
    }

    try {
        await product.update(req.body);
        res.status(200).json({ message: `the product has been updated` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePruductById = async(req, res) => {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({ message: "data tidak ditemukan" });
    };

    try {
        await product.destroy();
        res.status(200).json({ message: 'product deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProductById, deletePruductById };