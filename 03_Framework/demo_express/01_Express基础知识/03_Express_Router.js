/**
 * @file    : 03_Express_Router.js
 * @author  : KeeneChen
 * @date    : 2023.06.08-10:04:09
 * @details : Express Router
 */

const express = require('express');

const app = express();
const port = 3000;

// 1.创建路由对象
const router = express.Router();

// 2.配置路由规则
router.get('/', (req, res) => {
  res.send('Hello World!');
});

// 3.将路由对象挂载到服务器上
app.use(router);

// 4.创建子路由
const subRouter = express.Router();

subRouter.get('/a', (req, res) => {
  res.send('/a');
});

subRouter.get('/b', (req, res) => {
  res.send('/b');
});

app.use('/user', subRouter); // 注册user子路由

// 5.监听端口
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
