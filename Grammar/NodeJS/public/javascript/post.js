// 导入express包
const express = require('express');
const bodyParser = require('body-parser');
// 常见express实例
const app = express();

// 端口定义
const port = 3000;
const host = 'http://localhost:';

// 配置中间件获取post请求体
//app.use(bodyParser.urlencoded({ extended: false }));

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// 配置get请求
app.get('/', (req, res) => {
  if (req.url !== '/favicon.ico') {
    console.dir(req.query);
    res.send('请求的是：' + req.query.find);
  }
});

// 获取json请求体
app.post('/json', jsonParser, (req, res) => {
    console.dir(req.body);
    res.send('请求的是：' + req.body.name);
});

// 获取from表单请求体
app.post('/', urlencodedParser, (req, res) => {
    console.dir(req.body);
    res.send('请求的是：' + req.body.name);
});

// 监听端口
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`${host}${port}`);
});
