/**
 * @file    : index.js
 * @author  : KeeneChen
 * @date    : 2023.06.17-22:38:57
 * @details : mongodb原生连接
 * @see     : https://mongodb.github.io/node-mongodb-native/3.6/quick-start/quick-start/
 */

// const { MongoClient } = require('mongodb');
// or as an es module:
import { MongoClient } from 'mongodb';

// Connection URL
const url: string = 'mongodb://127.0.0.1:27017';
const client: MongoClient = new MongoClient(url);

// Database Name
const dbName: string = 'test';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const coll = db.collection('documents');

  // 插入数据
  const insertResult = await coll.insertMany([
    { a: 1 },
    { b: 2 },
    { c: 3 },
  ]);
  console.log('Inserted documents =>', insertResult);

  // 查询数据
  const findResult = await coll.find({}).toArray();
  console.log('Found documents =>', findResult);

  // 更新数据
  const updateResult = await coll.updateOne(
    { a: 1 },
    { $set: { a: 100 } }
  );
  console.log('Updated documents =>', updateResult);

  // 删除数据
  const deleteResult = await coll.deleteOne({ a: 100 });
  console.log('Deleted documents =>', deleteResult);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
