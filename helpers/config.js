const knex = require('knex');
const mysql = require('mysql2');
require('dotenv').config();


const connection = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
});


module.exports = connection;