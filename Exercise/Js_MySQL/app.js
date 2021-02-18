const mysql = require('mysql');

const conn = mysql.createConnection({
  host: '134.175.221.21',
  user: 'root',
  password: '2555',
  port: '33306',
  database: 'datafaker',
});

conn.connect();

// SQL Statement
const SQL = 'SELECT * FROM test LIMIT 10';
conn.query(SQL, (error, results, fields) => {
  if (error) throw error;

  for (let i = 0; i < results.length; i++) {
    console.log(results[i]);
  }
});

conn.end();
