/*
 * @Author: your name
 * @Date: 2020-09-08 08:34:54
 * @LastEditTime: 2020-09-16 10:50:37
 * @LastEditors: HelloChen
 * @Description: In User Settings Edit
 * @FilePath: /chartse:/ZM/NodeJS/index.js
 */
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-Parser');
const cookieParser = require('cookie-parser')
const root = require('./routers/root');
const main = require('./routers/main');
const ceshi = require('./routers/test');
const crud = require('./routers/crud');
const auth = require('./routers/basicAuth');

const app = express();
const host = 'http://localhost:';
const port = 3000;

// 配置art-template中间件
app.engine('html', require('express-art-template'));

// 配置静态文件中间件
app.use('/public', express.static(__dirname + 'public'));

// 配置body-parser解析post请求体数据
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 配置cookie
app.use(cookieParser())


// 路由中间件
app.use(cors());
app.use('/', root);
app.use('/', main);
app.use('/test', ceshi);
app.use('/crud', crud);
app.use('/auth', auth);

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`${host}${port}`);
});
