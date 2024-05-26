/**
 * @file    : app.js
 * @author  : KeeneChen
 * @date    : 2023.06.09-15:37:26
 * @details : MySQL 连接测试
 */

const mysql = require('mysql');

// 创建数据库连接池，配置基本信息，连接mysql
const db = mysql.createPool({
  host: '192.168.8.9',
  user: 'root',
  password: '2555',
  database: 'keenechen',
});

db.getConnection((err, conn) => {
  // 测试 mysql 模块能否正常工作
  /*   db.query('select 1', (err, res) => {
    if (err) return console.log(err.message);
    console.log(res);
    conn.release();
  }); */

  // 查询 users 表中所有的数据
  const sqlStr = 'select * from test limit 10';
  db.query(sqlStr, (err, res) => {
    if (err)
      return console.log(err.message);
    // 注意：如果执行的是 select 查询语句，则执行的结果是数组
    console.log(res);
  });

  // 向 users 表中，新增一条数据，其中 username 的值为 Spider-Man，password 的值为 pcc123
  /* const user = { username: 'Spider-Man', password: 'pcc123' };
  // 定义待执行的 SQL 语句
  const sqlStr = 'insert into users (username, password) values (?, ?)';
  // 执行 SQL 语句
  db.query(sqlStr, [user.username, user.password], (err, res) => {
    // 执行 SQL 语句失败了
    if (err) return console.log(err.message);
    // 成功了
    // 注意：如果执行的是 insert into 插入语句，则 res 是一个对象
    // 可以通过 affectedRows 属性，来判断是否插入数据成功
    if (res.affectedRows === 1) {
      console.log('插入数据成功!');
    }
  }); */

  // 演示插入数据的便捷方式
  /*   const user = { username: 'Spider-Man2', password: 'pcc4321' };
  // 定义待执行的 SQL 语句
  const sqlStr = 'insert into users set ?';
  // 执行 SQL 语句
  db.query(sqlStr, user, (err, res) => {
    if (err) return console.log(err.message);
    if (res.affectedRows === 1) {
      console.log('插入数据成功');
    }
  }); */

  // 演示如何更新用户的信息
  /* const user = { id: 6, username: 'aaa', password: '000' };
  // 定义 SQL 语句
  const sqlStr = 'update users set username=?, password=? where id=?';
  // 执行 SQL 语句
  db.query(sqlStr, [user.username, user.password, user.id], (err, res) => {
    if (err) return console.log(err.message);
    // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
    if (res.affectedRows === 1) {
      console.log('更新成功');
    }
  }); */

  // 演示更新数据的便捷方式
  /* const user = { id: 6, username: 'aaaa', password: '0000' };
  // 定义 SQL 语句
  const sqlStr = 'update users set ? where id=?';
  // 执行 SQL 语句
  db.query(sqlStr, [user, user.id], (err, res) => {
    if (err) return console.log(err.message);
    if (res.affectedRows === 1) {
      console.log('更新数据成功');
    }
  }); */

  // 删除 id 为 5 的用户
  /* const sqlStr = 'delete from users where id=?';
  db.query(sqlStr, 5, (err, res) => {
    if (err) return console.log(err.message);
    // 注意：执行 delete 语句之后，结果也是一个对象，也会包含 affectedRows 属性
    if (res.affectedRows === 1) {
      console.log('删除数据成功');
    }
  }); */

  // 标记删除
  /* const sqlStr = 'update users set status=? where id=?';
  db.query(sqlStr, [1, 6], (err, res) => {
    if (err) return console.log(err.message);
    if (res.affectedRows === 1) {
      console.log('标记删除成功');
    }
  }); */

  if (err)
    return console.log(err.message);
});
