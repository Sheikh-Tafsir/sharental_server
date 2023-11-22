// // models/Product.js

// const { DataTypes } = require('sequelize');
// const sequelize = require('../../config/databse'); // Adjust the path based on your project structure

// const ProductModel = sequelize.define('Product', {
//   id: {
//     type: DataTypes.UUID, // or INTEGER, depending on your preference
//     defaultValue: DataTypes.UUIDV4, // or use an auto-incrementing integer ID
//     allowNull: false,
//     primaryKey: true,
//   },
//     title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   desc: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
//   rating: {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   },
//   prodLongitude: {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   },
//   prodLatitude: {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   },
//   postalCode: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   priceHourly: {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   },
//   priceDaily: {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   },
//   priceWeekly: {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   },
//   priceMonthly: {
//     type: DataTypes.FLOAT,
//     allowNull: true,
//   },
//   image: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// module.exports = ProductModel;
