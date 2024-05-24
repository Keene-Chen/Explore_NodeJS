const fs = require('fs');

let str = ' ';

for (let i = 1; i < 101; i++) {
  str += i+'这是测试流文件\n';
}

const writeStream = fs.createWriteStream('data.txt');

writeStream.write(str,'UTF8');
writeStream.end();

writeStream.on('finish',()=>{
  console.log('写入完成！');
})