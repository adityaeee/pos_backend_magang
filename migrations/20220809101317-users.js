'use strict';

const { DataTypes, QueryInterface } = require('sequelize')

module.exports = {
    async up(queryInterface = new QueryInterface, Sequelize) {

        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            name: DataTypes.STRING,
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            address: DataTypes.STRING,
            email: DataTypes.STRING,
            phone: DataTypes.STRING,
            dateOfBirth: DataTypes.DATEONLY,
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            }
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    }
};