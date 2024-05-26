/**
 * @file    : server.js
 * @author  : KeeneChen
 * @date    : 2023.06.09-10:18:14
 * @details : NodeJS 跨域
 */

const path = require('node:path');
const express = require('express');
const cors = require('cors');
const apiRouter = require('./router/apiRouter');

const app = express();
const port = 3000;

app.set('view engine', 'hbs'); // 模板引擎
app.set('views', path.join(__dirname, './views')); // 模板目录,使用path.join()方法拼接路径防止路径错误

// jsonp 跨域请求
app.get('/api/jsonp', (req, res) => {
  const data = {
    name: '张三',
    age: 18,
  };
  const callback = req.query.callback;
  res.send(`${callback}(${JSON.stringify(data)})`);
});
app.use(cors()); // 跨域
app.use('/api', apiRouter); // 路由
app.use(express.static('public')); // 静态文件服务

app.get('/', (req, res) => {
  res.render('index', { name: '张三', age: 18 });
});

// 404
app.use('*', (req, res) => {
  res.status(404).render('404', { url: req.originalUrl });
});

// 全局错误处理
app.use((err, req, res, next) => {
  res.status(500).render('500');
  console.log(err);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
