/**
 * @file    : user.js
 * @author  : KeeneChen
 * @date    : 2023.06.10-15:27:47
 * @details : user router handler
 */

// 导入数据库操作模块
const db = require('../db/index');
// 导入加密模块
const bcrypt = require('bcryptjs');

// 注册用户处理函数
exports.reguser = (req, res) => {
  // 判断数据是否合法
  const userinfo = req.body;
  if (!userinfo.username || !userinfo.password) {
    return res.cc('用户名或密码不能为空！');
    // return res.send({ status: 1, message: '用户名或密码不能为空！' });
  }

  // 定义SQL语句并判断用户名是否被占用
  const querySql = `select * from ev_users where username=?`;
  // ? 注意这里SQL查询语句的results与外层的res不要混淆了
  db.query(querySql, userinfo.username, (err, results) => {
    // 执行 SQL 语句失败
    if (err) {
      return res.cc(err);
      // return res.send({ status: 1, message: err.message });
    }

    // 用户名被占用
    if (results.length > 0) {
      return res.cc('用户名被占用，请更换其他用户名！');
      // return res.send({
      //   status: 1,
      //   message: '用户名被占用，请更换其他用户名！',
      // });
    }

    // 插入新用户
    const insertSql = 'insert into ev_users set ?';
    // 对密码进行加密处理
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);
    db.query(
      insertSql,
      { username: userinfo.username, password: userinfo.password },
      (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
          return res.cc(err);
          // return res.send({ status: 1, message: err.message });
        }

        // SQL 语句执行成功,但影响行数不为 1
        if (results.affectedRows !== 1) {
          return res.cc('注册用户失败，请稍后再试！');
          // return res.send({ status: 1, message: '注册用户失败，请稍后再试！' });
        }

        // 注册成功
        res.cc(0, '注册成功！');
        // res.send({ status: 0, message: '注册成功！' });
      }
    );
  });
};

// 登录处理函数
exports.login = (req, res) => {
  req.send('login success');
};
