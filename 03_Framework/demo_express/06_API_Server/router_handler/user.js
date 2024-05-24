/**
 * @file    : user.js
 * @author  : KeeneChen
 * @date    : 2023.06.10-15:27:47
 * @details : 用户注册登录处理函数模块
 */

// 导入数据库操作模块
const db = require('../db/mysql');
// 导入加密模块
const bcrypt = require('bcryptjs');
// 导入生成 Token 字符串的包
const jwt = require('jsonwebtoken');
// 导入配置文件
const config = require('../config');

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
        if (err) return res.cc(err);
        // return res.send({ status: 1, message: err.message });

        // SQL 语句执行成功,但影响行数不为 1
        if (results.affectedRows !== 1)
          return res.cc('注册用户失败，请稍后再试！');
        // return res.send({ status: 1, message: '注册用户失败，请稍后再试！' });

        // 注册成功
        res.cc(0, '注册成功！');
        // res.send({ status: 0, message: '注册成功！' });
      }
    );
  });
};

// 登录处理函数
exports.login = (req, res) => {
  // 接收表单数据
  const userinfo = req.body;

  // 定义SQL语句并查询用户信息
  const querySql = `select * from ev_users where username=?`;
  db.query(querySql, userinfo.username, (err, results) => {
    if (err) return res.cc(err);

    // 执行 SQL 语句成功，但是查询到的数据条数不等于 1
    if (results.length !== 1) return res.cc('登录失败！');

    // 判断用户输入的登录密码是否和数据库中的密码一致
    const compareResult = bcrypt.compareSync(
      userinfo.password,
      results[0].password
    );
    if (!compareResult) return res.cc('登录失败！');

    // 在服务器端生成 Token 字符串
    const user = { ...results[0], password: '', user_pic: '' };
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn,
    });

    // 登录成功
    res.send({
      status: 0,
      message: '登录成功！',
      token: 'Bearer ' + tokenStr,
    });
  });
};
