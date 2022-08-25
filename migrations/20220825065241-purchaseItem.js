'use strict';

const sequelize = require('sequelize');
const { DataTypes, queryInterface } = require('sequelize');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('purchaseItem', {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            productId: {
                type: Sequelize.UUID,
                references: {
                    model: 'products',
                    key: 'id',
                },
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE',
            },
            price: DataTypes.DECIMAL(18, 2),
            quantity: DataTypes.DECIMAL(18, 2),
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
        await queryInterface.dropTable('purchaseItem');
    }
};