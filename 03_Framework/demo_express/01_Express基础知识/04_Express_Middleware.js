/**
 * @file    : 04_Express_Middleware.js
 * @author  : KeeneChen
 * @date    : 2023.06.08-10:15:40
 * @details : Express Middleware
 */

const express = require('express');

const app = express();
const port = 3000;

/**
 * @brief : 全局中间件
 * @disc  : 此中间件会在用户发起任何请求都可能会执行
 */
app.use((req, res, next) => {
  console.log('全局中间件');
  next();
});

/**
 * @brief : 路由中间件
 * @disc  : 通过在路由定义时注册中间件，此中间件只会在用户访问该路由时执行
 */
function routerMiddleware(req, res, next) {
  console.log('路由中间件');
  next();
}

app.get('/', routerMiddleware, (req, res) => {
  console.log('调用了路由中间件');
  res.send('调用了路由中间件');
});

/**
 * @brief : 路由处理程序
 * @disc  : 您可以提供多个回调函数，以类似于中间件的行为方式来处理请求。唯一例外是这些回调函数可能调用 next('route') 来* 绕过剩余的路由回调。您可以使用此机制对路由施加先决条件，在没有理由继续执行当前路由的情况下，可将控制权传递给后续路由。
 * 路由处理程序的形式可以是一个函数、一组函数或者两者的结合，如以下示例中所示。
 */

// 单个回调函数可以处理一个路由
app.get('/example/a', (req, res) => {
  res.end('Hello from A!');
});

// 多个回调函数可以处理一个路由(确保您指定 next 对象)
app.get(
  '/example/b',
  (req, res, next) => {
    console.log('the response will be sent by the next  ...');
    next();
  },
  (req, res) => {
    res.send('Hello from B!');
  },
);

// 一组回调函数可以处理一个路由
function cb0(req, res, next) {
  console.log('CB0');
  next();
}

function cb1(req, res, next) {
  console.log('CB1');
  next();
}

function cb2(req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);

// 独立函数与一组函数的组合可以处理一个路由
function cb3(req, res, next) {
  console.log('CB0');
  next();
}

function cb4(req, res, next) {
  console.log('CB1');
  next();
}

app.get(
  '/example/d',
  [cb3, cb4],
  (req, res, next) => {
    console.log('the response will be sent by the next function ...');
    next();
  },
  (req, res) => {
    res.send('Hello from D!');
  },
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
