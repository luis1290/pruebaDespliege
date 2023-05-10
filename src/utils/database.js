// vamos  a gestionar la conexion con una base de datos

// paso 1 importar sequelize
const { Sequelize } = require('sequelize');
require('dotenv').config();

// crear una instancia de sequelize con la configuracion de la conexion
const db = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: "postgres",
  dialectOptions: {ssl: { require: true, rejectUnauthorized: false }}
});

module.exports = db;
