import * as fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let a = [1, 2, 3, 45, 5, 5, 5, 5, 5, 5, 5, 6, 5, 5, 5, 5, 5, 6, 65];

// 将数组转换为字符串
let data = a.join(', ');

fs.writeFile(path.join(__dirname, '1.log'), data, err => {
  if (err) {
    console.error('写入文件时发生错误:', err);
    return;
  }
  console.log('文件写入成功');
});
