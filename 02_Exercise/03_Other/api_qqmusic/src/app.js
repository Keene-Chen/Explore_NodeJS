const mongoose = require("mongoose");
const fs = require("fs");
const xlsx = require("xlsx");
const playListModel = require("./palyListModel");
const qqmusicData = require("./getData");

const url = "mongodb://192.168.8.9:27017/test";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, options)
  .then(() => {
    console.log(`MongoDB Connected ${url}`);
  })
  .catch((err) => {
    console.log("MongoDB Connection Error", err);
  });

async function onlineWriteToDB() {
  try {
    const playList = await qqmusicData.getUserCreatedPlaylist();
    const playListData = playList.map((e) => ({
      diss_name: e.diss_name,
      diss_cover: e.diss_cover,
      song_cnt: e.song_cnt,
      listen_num: e.listen_num,
      dirid: e.dirid,
      tid: e.tid,
      dir_show: e.dir_show,
    }));
    await playListModel.create(playListData).then(() => {
      console.log("写入成功");
    });
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
}

// onlineWriteToDB();

playListModel
  .find({})
  .exec()
  .then((data) => {
    data.sort((a, b) => {
      let nameA = a.diss_name.toLowerCase();
      let nameB = b.diss_name.toLowerCase();
      let chineseReg = /^[\u4e00-\u9fa5]/; // 正则表达式匹配中文字符

      // 判断是否都是中文字符
      if (chineseReg.test(nameA) && chineseReg.test(nameB)) {
        return nameA.localeCompare(nameB, "zh-Hans-CN", {
          sensitivity: "accent",
        });
      } else {
        // 如果不是，则按照字母顺序排序
        if (nameA === "a-lin") {
          return 1;
        }
        if (nameB === "a-lin") {
          return -1;
        }
        if (nameA === "g.e.m. 邓紫棋") {
          return 1;
        }
        if (nameB === "g.e.m. 邓紫棋") {
          return -1;
        }
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      }
      return 0;
    });
    return data;
  })
  .then((data) => {
    data.forEach((e) => {
      fs.appendFileSync("./res/playlist.txt", e.diss_name + "\n");
      // console.log(e.diss_name);
    });
    return data;
  })
  .then((data) => {
    let temp = data.map((e) => ({
      diss_name: e.diss_name,
      diss_cover: e.diss_cover,
      song_cnt: e.song_cnt,
      listen_num: e.listen_num,
      dirid: e.dirid,
      tid: e.tid,
      dir_show: e.dir_show,
    }));
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(temp);
    xlsx.utils.book_append_sheet(workbook, worksheet, "playlist");
    xlsx.writeFile(workbook, "./res/playlist.xlsx");
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });

const db = mongoose.connection;
db.once("open", () => {
  console.log("数据库连接成功");
});

db.once("close", () => {
  console.log("数据库已断开");
});

db.once("error", (error) => {
  console.log("数据库出错", error);
});
