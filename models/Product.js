// const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
        },
        buyingPrice: {
            type: DataTypes.DECIMAL(18, 2),
        },
        sellingPrice: {
            type: DataTypes.DECIMAL(18, 2),
        },
        description: {
            type: DataTypes.TEXT,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
        createdBy: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
        },
        updatedBy: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
        },

    }, {
        timesTamps: true,
        tableName: 'products'
    });

    return Product;
}