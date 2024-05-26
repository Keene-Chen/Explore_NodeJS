/**
 * @file clear.mjs
 * @desc clear
 * @author KeeneChen <keenechen@qq.com>
 * @since  2023.12.16-18:58:45
 */

import fs from 'node:fs';
import path from 'node:path';

// 设置要搜索的根目录
const root = './';

// 递归删除 node_modules 目录、yarn.lock、package-lock.json 和 pnpm-lock.yaml 文件
function deleteNodeModulesRec(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      if (file === 'node_modules') {
        // 如果是 node_modules 目录，递归删除整个目录
        console.log(`Deleting ${filePath}`);
        deleteFolder(filePath);
      }
      else {
        // 递归处理子目录
        deleteNodeModulesRec(filePath);
      }
    }
    else if (['yarn.lock', 'package-lock.json', 'pnpm-lock.yaml'].includes(file)) {
      // 如果是 lock 文件，直接删除
      console.log(`Deleting ${filePath}`);
      fs.unlinkSync(filePath);
    }
  });
}

// 递归删除整个目录
function deleteFolder(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // 递归删除子目录
        deleteFolder(curPath);
      }
      else {
        // 删除文件
        fs.unlinkSync(curPath);
      }
    });
    // 删除空目录
    fs.rmdirSync(folderPath);
  }
}

// 运行主函数
deleteNodeModulesRec(root);

console.log(
  'Done! All node_modules directories, yarn.lock, package-lock.json, and pnpm-lock.yaml files have been deleted.',
);
