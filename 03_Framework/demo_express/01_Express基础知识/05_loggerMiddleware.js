/**
 * @file    : 05_loggerMiddleware.js
 * @author  : KeeneChen
 * @date    : 2023.06.08-10:34:02
 * @details : 日志中间件
 */

const express = require('express');

const app = express();
const port = 3000;

function logger(req, res, next) {
  const time = new Date();
  console.log(`[${time.toLocaleString()}] ${req.method} ${req.url}`);
  next();
}

app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
