'use strict';

const { DataTypes, QueryInterface } = require(`sequelize`);

module.exports = {
    async up(queryInterface = new QueryInterface, Sequelize) {
        await queryInterface.createTable('products', {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            name: DataTypes.STRING,
            buyingPrice: DataTypes.DECIMAL(18, 2),
            sellingPrice: DataTypes.DECIMAL(18, 2),
            description: DataTypes.TEXT,
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            createdBy: {
                type: Sequelize.UUID,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE',
            },
            updatedBy: {
                type: Sequelize.UUID,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE',
            }
        });
    },

    async down(queryInterface, Sequelize) {
        queryInterface.dropTable('products');

    }
};