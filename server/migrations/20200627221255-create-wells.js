'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Wells', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      WKT: {
        type: Sequelize.STRING
      },
      SYMNUM: {
        type: Sequelize.STRING
      },
      GIS_SYMBOL_DESCRIPTION: {
        type: Sequelize.STRING
      },
      RELIAB: {
        type: Sequelize.STRING
      },
      GIS_LOCATION_SOURCE: {
        type: Sequelize.STRING
      },
      API: {
        type: Sequelize.STRING
      },
      GIS_WELL_NUMBER: {
        type: Sequelize.STRING
      },
      GIS_API5: {
        type: Sequelize.STRING
      },
      GIS_LONG83: {
        type: Sequelize.STRING
      },
      GIS_LAT83: {
        type: Sequelize.STRING
      },
      GIS_LAT27: {
        type: Sequelize.STRING
      },
      UNIQID: {
        type: Sequelize.STRING
      },
      GIS_LONG27: {
        type: Sequelize.STRING
      },
      SHAPE_X: {
        type: Sequelize.STRING
      },
      SHAPE_Y: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Wells');
  }
};