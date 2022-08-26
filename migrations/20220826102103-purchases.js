'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('purchases', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4
            },
            status: {
                type: Sequelize.ENUM(['draft', 'finalized']),
                defaultValue: 'draft',
            },
            totalPrice: Sequelize.DECIMAL(18, 2),
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

        await queryInterface.createTable('purchase_items', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4
            },
            purchaseId: {
                type: Sequelize.UUID,
                references: {
                    model: 'purchases',
                    key: 'id',
                },
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE',
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
            price: Sequelize.DECIMAL(18, 2),
            quantity: Sequelize.DECIMAL(18, 2),
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
        await queryInterface.dropTable('purchases');
        await queryInterface.dropTable('purchase_items')
    }
};