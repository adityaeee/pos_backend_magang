module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.define('Purchase', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        status: {
            type: DataTypes.ENUM(['draft', 'finalized']),
            defaultValue: 'draft',
        },
        totalPrice: DataTypes.DECIMAL(18, 2),
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
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
        timesTemps: true,
        tableName: 'purchases'
    });

    return Purchase;
}