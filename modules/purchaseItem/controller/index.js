const { PurchaseItem } = require("../../../models");

const Validator = require("fastest-validator");

const v = new Validator();

const getPurchaseItem = async(req, res) => {
    try {
        const purchase = await PurchaseItem.findAll();
        res.status(200).json(purchase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPurchaseItemById = async(req, res) => {
    try {
        const purchaseItem = await PurchaseItem.findByPk(req.params.id);

        if (!purchaseItem) {
            res.status(404).json({ message: "purchase item not found" });
        }

        res.status(200).json(purchaseItem);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const createPurchaseItem = async(req, res) => {
    const schema = {
        id: { type: "string" },
        productId: { type: "string" },
        purchaseId: { type: "string" },
        price: { type: "number", positive: true, convert: true },
        quantity: { type: "number", positive: true, convert: true },
        createdBy: { type: "string" },
    };

    const validate = v.validate(req.body, schema);

    if (validate.lenght) {
        return res.status(404).json(validate);
    }

    try {
        const createPurchaseItem = await PurchaseItem.create(req.body);
        res.status(201).json(createPurchaseItem);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updatePurchaseItemById = async(req, res) => {
    const schema = {
        id: { type: "string", optional: true },
        productId: { type: "string", optional: true },
        purchaseId: { type: "string", optional: true },
        price: { type: "number", positive: true, convert: true, optional: true },
        quantity: { type: "number", positive: true, convert: true, optional: true },
        updatedBy: { type: "string" },
    };

    try {
        let purchaseItem = await PurchaseItem.findByPk(req.params.id);

        if (!purchaseItem) {
            res.status(404).json({ message: "purchase item not found" });
        }

        const validate = v.validate(req.body, schema);

        if (validate.lenght) {
            return res.status(404).json(validate);
        }

        await purchaseItem.update(req.body);
        res.status(200).json({ message: "the product has been updated", purchaseItem });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePurchaseItemById = async(req, res) => {
    const purchaseItem = await PurchaseItem.findByPk(req.params.id);

    if (!purchaseItem) {
        res.status(404).json({ message: "purchase item not found" });
    }

    try {
        await purchaseItem.destroy();
        res.status(200).json({ message: "purchase item deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getPurchaseItem, getPurchaseItemById, createPurchaseItem, updatePurchaseItemById, deletePurchaseItemById };