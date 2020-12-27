const mysql = require('mysql');

// 连接
function connectDB() {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'phplearn',
  });

  db.connect((err) => {
    if (err) throw err;
    console.log('connection succeeded!');
  });
}

// 查询
function queryDB() {
  db.query('SELECT * FROM myguests', function (err, results, fields) {
    if (err) throw err;
    results.forEach((element) => {
      console.log(element);
    });
  });
}
module.exports = { connectDB,queryDB };
