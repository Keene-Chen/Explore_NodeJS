import fs from 'node:fs';
import download from 'download-git-repo';
import ora from 'ora';

const spinner = ora('下载中...');

// 验证路径
export function checkPath(path) {
  return fs.existsSync(path);
}

// 下载
export function downloadTemp(branch, project) {
  spinner.start();
  return new Promise((resolve, reject) => {
    download(
      `direct:https://gitee.com/chinafaker/vue-template.git#${branch}`,
      project,
      { clone: true },
      (err) => {
        if (err) {
          reject(err);
          console.log(err);
        }
        resolve();
        spinner.succeed('下载完成');
      },
    );
  });
}
