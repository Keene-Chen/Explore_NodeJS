const MClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/learn";
const useParser = { useNewUrlParser: true ,useUnifiedTopology: true };
MClient.connect(url, useParser, function(err, db) {
  if (err) throw err;
  console.log("connection succeeded!");
  db.close();
});

MClient.connect(url, useParser, function(err, db) {
  if (err) throw err;
  const dbo = db.db("learn");
  const myobj =  [
      { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
      { name: 'Google', url: 'https://www.google.com', type: 'en'},
      { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
     ];
  dbo.collection("site").insertMany(myobj, function(err, ret) {
      if (err) throw err;
      console.log("插入的文档数量为: " + ret.insertedCount);
      db.close();
  });
});