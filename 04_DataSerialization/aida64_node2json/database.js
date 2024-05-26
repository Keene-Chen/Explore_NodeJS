const fs = require('node:fs');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://keenechen:27017/mydata';

// 创建数据库并创建集合
/* MongoClient.connect(url, (err, db) =>{
    if (err) throw err;
    console.log('数据库已创建!');
    let dbase = db.db('mydata');
    dbase.createCollection('data', function (err, res) {
        if (err) throw err;
        console.log('创建集合!');
        db.close();
    });
}); */

const path = 'E:\\ZM\\JavaScript\\Test\\aida64_nodejs_to_json\\data.json';
const rawdata = fs.readFileSync(path);
const aida64 = JSON.parse(rawdata);

// 插入数据
/* MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    let dbo = db.db('mydata');
    let myobj = { name: '菜鸟教程', url: 'www.runoob' };
    dbo.collection('data').insertOne(aida64, (err, res) => {
        if (err) throw err;
        console.log('文档插入成功');
        db.close();
    });
});
 */

MongoClient.connect(url, (err, db) => {
  if (err)
    throw err;
  const dbo = db.db('mydata');
  dbo.collection('data')
    .find({})
    .toArray((err, result) => {
      // 返回集合中所有数据
      if (err)
        throw err;
      console.log(result);
      db.close();
    });
});
