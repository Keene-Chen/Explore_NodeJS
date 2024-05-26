const mongoose = require('mongoose');
const repoModel = require('./repoModel');

async function findOne(condition) {
  try {
    const result = await repoModel.findOne(condition).exec();
    console.log(result);
  }
  catch (err) {
    console.log(err);
  }
  finally {
    mongoose.connection.close();
  }
}

async function find(condition) {
  try {
    const result = await repoModel.find(condition).exec();
    console.log(result.length);
  }
  catch (err) {
    console.log(err);
  }
  finally {
    mongoose.connection.close();
  }
}

module.exports = { findOne, find };
