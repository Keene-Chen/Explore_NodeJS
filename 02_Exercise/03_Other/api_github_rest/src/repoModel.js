const mongoose = require('mongoose');

const repoSchema = new mongoose.Schema({
  name: String,
  full_name: String,
  html_url: String,
  description: String,
  topics: Array,
  created_at: String,
  updated_at: String,
  pushed_at: String,
  language: String,
  starred_at: String,
});

const repoModel = mongoose.model(
  'github_starred',
  repoSchema,
  'github_starred',
);

module.exports = repoModel;
