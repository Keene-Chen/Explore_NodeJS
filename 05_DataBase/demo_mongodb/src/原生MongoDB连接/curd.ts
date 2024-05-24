import { client, coll } from './connect';

async function curd() {
  try {
    // 插入数据
    const insertResult = await coll.insertMany([{ a: 1 }, { b: 2 }, { c: 3 }]);
    console.log('Inserted documents =>', insertResult);

    // 查询数据
    const findResult = await coll.find({}).toArray();
    console.log('Found documents =>', findResult);

    // 更新数据
    const updateResult = await coll.updateOne({ a: 1 }, { $set: { a: 100 } });
    console.log('Updated documents =>', updateResult);

    // 删除数据
    const deleteResult = await coll.deleteOne({ a: 100 });
    console.log('Deleted documents =>', deleteResult);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
    console.log('Connection closed.');
  }
}

async function miscOperation() {
  try {
    // 去重
    const distinctResult = await coll.distinct('_id');
    console.log('Distinct documents =>', distinctResult);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
    console.log('Connection closed.');
  }
}

miscOperation();
