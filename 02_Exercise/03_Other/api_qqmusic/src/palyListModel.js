const mogoose = require("mongoose");

const playListSchema = new mogoose.Schema({
  diss_name: String,
  diss_cover: String,
  song_cnt: Number,
  listen_num: Number,
  dirid: Number,
  tid: Number,
  dir_show: Number,
});

const playListModel = mogoose.model("playList", playListSchema, "PlayList");

module.exports = playListModel;
