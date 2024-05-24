/**
 * @file    : index.js
 * @author  : KeeneChen
 * @date    : 2023.06.12-10:48:47
 * @details : 数据库连接模块
 */

const mysql = require('mysql');

const db = mysql.createPool({
  host: '192.168.8.9',
  user: 'root',
  password: '2555',
  database: 'nodejs',
});

module.exports = db;
