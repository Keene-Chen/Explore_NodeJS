// 导入express包
const express = require('express');

// 常见express实例
const app = express();

// 端口定义
const port = 3000;
const host = 'http://localhost:';

// 配置get请求
app.get('/:id', (req, res) => {
  if (req.url !== '/favicon.ico') {
    console.log(req.params.id);
    res.send(req.params.id);
  }
});

// 请求可以使用多个变量作为参数
app.get('/profile/:name/:id', (req, res) => {
  if (req.url !== '/favicon.ico') {
    //console.dir 获取请求包含的参数
    console.dir(req.params);
    res.send(req.params.name);
  }
});

// 查询请求字符串
app.get('/', (req, res) => {
  if (req.url !== '/favicon.ico') {
    console.dir(req.query);
    res.send('请求的是：'+ req.query.find);
  }
});

// 监听端口
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`${host}${port}`);
});
