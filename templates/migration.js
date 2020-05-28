'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("${TABLE_NAME}", {
            id: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },

            createdAt: {
                type: new DataTypes.DATE
            },
            updatedAt: {
                type: new DataTypes.DATE
            },
        });
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.dropTable('${TABLE_NAME}');

    }
};
