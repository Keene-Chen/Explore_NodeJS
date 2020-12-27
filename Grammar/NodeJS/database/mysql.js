const mysql = require('mysql');

let optin = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'phplearn',
};

const conn = mysql.createConnection(optin);
conn.connect();

// 查
const sql = 'SELECT * FROM myguests ORDER BY id';

conn.query(sql, (err, ret, fields) => {
  if (err) throw err;
  console.log('The solution is: ', ret);
});

// 增
const addSql = 'INSERT INTO myguests(firstname,lastname,email) VALUES(?,?,?)';
const addSqlParams = ['菜鸟工具', 'https://c.runoob.com', '23453'];
conn.query(addSql, addSqlParams, (err, ret) => {
  if (err) {
    console.log('[INSERT ERROR] - ', err.message);
    return;
  }

  console.log('--------------------------INSERT----------------------------');
  //console.log('INSERT ID:',result.insertId);
  console.log('INSERT ID:', ret);
  console.log(
    '-----------------------------------------------------------------\n\n'
  );
});

// 改
const modSql = 'UPDATE myguests SET firstname = ?,lastname = ? WHERE id = ?';
const modSqlParams = ['爱仕达多大所大多', 'https://m.runoob.com', 75];
conn.query(modSql, modSqlParams, (err, ret) => {
  if (err) throw err.message;
  console.log(ret);
});

// 删除
const delSql = 'DELETE FROM myguests where id=71';
conn.query(delSql, (err, ret) => {
  if (err) throw err.message;
  console.log(ret);
});
conn.end();
