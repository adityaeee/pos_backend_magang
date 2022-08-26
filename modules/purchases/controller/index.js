const { Purchase } = require('../../../models');

const Validator = require('fastest-validator');

const v = new Validator();

const getPurchase = async(req, res) => {
    try {
        const purchase = await Purchase.findAll();
        res.status(200).json(purchase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPurchaseById = async(req, res) => {
    try {
        const purchase = await Purchase.findByPk(req.params.id);

        if (!purchase) {
            res.status(404).json({ message: 'purchase item not found' });
        }

        res.status(200).json(purchase);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const createPurchase = async(req, res) => {
    const schema = {
        id: { type: "string" },
        totalPrice: { type: "number", positive: true, convert: true },
        createdBy: { type: "string" },
    };

    const validate = v.validate(req.body, schema);

    if (validate.lenght) {
        return res.status(404).json(validate);
    };

    try {
        const purchase = await Purchase.create(req.body);
        res.status(200).json(purchase);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

};

const updatePurchaseById = async(req, res) => {
    let purchase = await Purchase.findByPk(req.params.id)

    if (!purchase) {
        res.status(404).json({ message: 'purchase item not found' });
    };

    const schema = {
        id: { type: "string", optional: true },
        totalPrice: { type: "number", positive: true, convert: true, optional: true },
        updatedBy: { type: "string", optional: true },
    };

    const validate = v.validate(req.body, schema);

    if (validate.lenght) {
        return res.status(404).json(validate);
    };

    try {
        await purchase.update(req.body);
        res.status(200).json({ message: 'the product has been updated', purchase });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePurchaseById = async(req, res) => {
    const purchase = await Purchase.findByPk(req.params.id);

    if (!purchase) {
        res.status(404).json({ message: 'purchases not found' });
    };

    try {
        await purchase.destroy();
        res.status(200).json({ message: 'purchase item deleted' })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getPurchase, getPurchaseById, createPurchase, updatePurchaseById, deletePurchaseById };