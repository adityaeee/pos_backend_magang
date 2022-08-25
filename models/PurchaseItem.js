module.exports = (sequelize, DataTypes) => {
    const PurchaseItem = sequelize.define('PurchaseItem', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        productId: {
            type: DataTypes.UUID,
            references: {
                model: 'products',
                key: 'id',
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
        },
        price: DataTypes.DECIMAL(18, 2),
        quantity: DataTypes.DECIMAL(18, 2),
        createdBy: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
        },
        updatedBy: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
        }
    }, {
        timesTamps: true,
        tableName: 'purchaseItem'
    })

    return PurchaseItem;
};