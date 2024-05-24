// 导入文件模块
const fs = require('fs');

// 重命名文件
fs.rename('./data/data.json','./data/data1.json',(err)=>{
  if(err) throw (err);
  console.log('succeed!');
})

// 删除文件
fs.unlink('./data/data.txt',(err)=>{
  if(err) throw (err);
  console.log('succeed!');
})
