const axios = require("axios").default;
const fs = require("fs");

let GLOBAL_CONFIG = {
  QQ: 2421985222,
};

const kc_qqmusic = axios.create({
  baseURL: "http://127.0.0.1:3300",
  timeout: 1000,
});

// 获取用户创建歌单
const getUserCreatedPlaylist = async () => {
  try {
    const res = await kc_qqmusic.post("/user/songlist", {
      id: GLOBAL_CONFIG.QQ,
    });
    return [...res.data.data.list];
  } catch (err) {
    console.log(err);
  }
};

// 获取用户收藏歌单
function userFavoritePlaylists() {
  kc_qqmusic
    .post("/user/collect/songlist", {
      id: GLOBAL_CONFIG.QQ,
    })
    .then((res) => {
      let data = res.data.data;
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

// 获取用户收藏专辑
function userFavoriteAlbums() {
  kc_qqmusic
    .post("/user/collect/album", {
      id: GLOBAL_CONFIG.QQ,
    })
    .then((res) => {
      res.data.data.list.forEach((e) => {
        console.log(e.albumname, e.singername, e.songnum);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// 获取歌单详情
function test() {
  kc_qqmusic
    .post("/songlist", {
      id: GLOBAL_CONFIG.QQ,
    })
    .then((res) => {
      let data = res.data.data;
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function sortChinese(arr, dataLeven) {
  // 参数：arr 排序的数组; dataLeven 数组内的需要比较的元素属性
  /* 获取数组元素内需要比较的值 */
  function getValue(option) {
    // 参数： option 数组元素
    if (!dataLeven) return option;
    var data = option;
    dataLeven.split(".").filter(function (item) {
      data = data[item];
    });
    return data + "";
  }
  arr.sort(function (item1, item2) {
    console.log(getValue(item1).localeCompare(getValue(item2), "zh-CN"));
  });
}

module.exports = {
  getUserCreatedPlaylist,
  userFavoritePlaylists,
  userFavoriteAlbums,
  test,
};
