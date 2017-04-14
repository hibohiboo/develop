"use strict";

module.exports = function(sequelize, DataTypes) {
  var Movie = sequelize.define("Movie", {
    id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
    title: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    genre: DataTypes.STRING,
    price: DataTypes.INTEGER,
  });

  return Movie;
};