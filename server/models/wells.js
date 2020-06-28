'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wells = sequelize.define('Wells', {
    WKT: DataTypes.STRING,
    SYMNUM: DataTypes.STRING,
    GIS_SYMBOL_DESCRIPTION: DataTypes.STRING,
    RELIAB: DataTypes.STRING,
    GIS_LOCATION_SOURCE: DataTypes.STRING,
    API: DataTypes.STRING,
    GIS_WELL_NUMBER: DataTypes.STRING,
    GIS_API5: DataTypes.STRING,
    GIS_LONG83: DataTypes.STRING,
    GIS_LAT83: DataTypes.STRING,
    GIS_LAT27: DataTypes.STRING,
    UNIQID: DataTypes.STRING,
    GIS_LONG27: DataTypes.STRING,
    SHAPE_X: DataTypes.STRING,
    SHAPE_Y: DataTypes.STRING
  }, {});
  Wells.associate = function(models) {
    // associations can be defined here
  };
  return Wells;
};