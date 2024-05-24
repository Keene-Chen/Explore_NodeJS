/**
 * @file    : userModel.js
 * @author  : KeeneChen
 * @date    : 2023.06.18-14:44:46
 * @details : userModel
 */

import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  age: Number,
  score: Number,
});

const userModel = mongoose.model('User', userSchema, 'user');

export default userModel;
