const mysql = require('mysql');

const db = mysql.createPool({
  host: '192.168.8.9',
  user: 'root',
  password: '2555',
  database: 'nodejs',
});

module.exports = db;
