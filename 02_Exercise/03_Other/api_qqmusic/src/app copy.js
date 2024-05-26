const fs = require('node:fs');
const axios = require('axios').default;

const GLOBAL_CONFIG = {
  QQ: 2421985222,
};

const kc_qqmusic = axios.create({
  baseURL: 'http://127.0.0.1:3300',
  timeout: 1000,
});

// 获取用户创建歌单
function getUserCreatedPlaylist() {
  kc_qqmusic
    .post('/user/songlist', {
      id: GLOBAL_CONFIG.QQ,
    })
    .then((res) => {
      const data = res.data.data.list;
      data
        .sort((a, b) =>
          a.diss_name.localeCompare(b.diss_name, 'zh-Hans-CN', {
            sensitivity: 'accent',
          }),
        )
        .forEach((e) => {
          console.log(e.diss_name);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

getUserCreatedPlaylist();

// 获取用户收藏歌单
function userFavoritePlaylists() {
  kc_qqmusic
    .post('/user/collect/songlist', {
      id: GLOBAL_CONFIG.QQ,
    })
    .then((res) => {
      const data = res.data.data;
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

// 获取用户收藏专辑
function userFavoriteAlbums() {
  kc_qqmusic
    .post('/user/collect/album', {
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
    .post('/songlist', {
      id: GLOBAL_CONFIG.QQ,
    })
    .then((res) => {
      const data = res.data.data;
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
    if (!dataLeven)
      return option;
    let data = option;
    dataLeven.split('.').filter((item) => {
      data = data[item];
      return data;
    });
    return `${data}`;
  }
  arr.sort((item1, item2) => {
    console.log(getValue(item1).localeCompare(getValue(item2), 'zh-CN'));
    return true;
  });
}
