const express = require('express');
const bodyParser = require('body-Parser');
const app = express();

const host = "http://localhost:";
const port = 3000;

const test = require('./routers/test');

// 配置静态文件中间件
app.use('/public', express.static(__dirname + 'public'));

// 配置body-parser解析post请求体数据
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', test);

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server start in ${host}${port}`);
});


