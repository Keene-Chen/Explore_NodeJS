/**
 * @file    : index.js
 * @author  : KeeneChen
 * @date    : 2023.06.18-14:07:57
 * @details : Mongoose连接MongoDB
 */

import mongoose from 'mongoose';
import userModel from './userModel.js';
import * as curd from './curd.js';
// 导入彩色日志模块
import chalk from 'chalk';

// 连接MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// 连接成功
db.on('connected', () => {
  console.log(
    chalk.cyan('Mongoose connection open to mongodb://localhost:27017/test')
  );
});

// 连接异常
db.on('error', (err) => {
  console.log(chalk.red('Mongoose connection error: ' + err));
});

// 连接断开
db.on('disconnected', () => {
  console.log(chalk.green('Mongoose connection disconnected'));
});

curd.find({ name: 'KeeneChen' });
curd.findOne({ name: 'KeeneChen' });
