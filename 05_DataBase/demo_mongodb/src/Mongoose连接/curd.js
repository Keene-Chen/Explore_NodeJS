/**
 * @file    : curd.js
 * @author  : KeeneChen
 * @date    : 2023.06.18-14:55:21
 * @details : curd
 */

import userModel from './userModel.js';

// 执行查询
async function executeQuery(queryFunction, cond) {
  try {
    const result = await queryFunction.bind(userModel)(cond).exec();
    console.log(result);
  }
  catch (err) {
    console.log(err);
  }
  finally {
    // await mongoose.connection.close();
  }
}

// 添加数据-create
export async function create(cond) {
  await executeQuery(userModel.create, cond);
}

// 添加数据-save
export async function save(cond) {
  /* eslint-disable-next-line new-cap */
  const user = new userModel(cond);
  await executeQuery(user.save, cond);
}

// 批量插入数据-insertMany
export async function insertMany(cond) {
  await executeQuery(userModel.insertMany, cond);
}

// 删除数据-deleteOne
export async function deleteOne(cond) {
  await executeQuery(userModel.deleteOne, cond);
}

// 删除数据-deleteMany
export async function deleteMany(cond) {
  await executeQuery(userModel.deleteMany, cond);
}

// 更新数据-updateOne
export async function updateOne(cond) {
  await executeQuery(userModel.updateOne, cond);
}

// 更新数据-updateMany
export async function updateMany(cond) {
  await executeQuery(userModel.updateMany, cond);
}

// 查询数据-find
export async function find(cond) {
  await executeQuery(userModel.find, cond);
}

// 查询数据-findOne
export async function findOne(cond) {
  // try {
  //   const result = await userModel.findOne(cond).exec();
  //   console.log(result);
  // } catch (err) {
  //   console.log(err);
  // } finally {
  //   await mongoose.connection.close();
  // }
  await executeQuery(userModel.findOne, cond);
}

// 查询数据-findOneAndDelete
export async function findOneAndDelete(cond) {
  await executeQuery(userModel.findOneAndDelete, cond);
}

// 查询数据-findOneAndRemove
export async function findOneAndRemove(cond) {
  await executeQuery(userModel.findOneAndRemove, cond);
}

// 查询数据-findOneAndUpdate
export async function findOneAndUpdate(cond) {
  await executeQuery(userModel.findOneAndUpdate, cond);
}

// 查询数据-findOneAndReplace
export async function findOneAndReplace(cond) {
  await executeQuery(userModel.findOneAndReplace, cond);
}

// 查询数据-findById
export async function findById(cond) {
  await executeQuery(userModel.findById, cond);
}

// 查询数据-findByIdAndDelete
export async function findByIdAndDelete(cond) {
  await executeQuery(userModel.findByIdAndDelete, cond);
}

// 查询数据-findByIdAndRemove
export async function findByIdAndRemove(cond) {
  await executeQuery(userModel.findByIdAndRemove, cond);
}

// 查询数据-findByIdAndUpdate
export async function findByIdAndUpdate(cond) {
  await executeQuery(userModel.findByIdAndUpdate, cond);
}
