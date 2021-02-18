const axios = require('axios');
const fs = require("fs");

/* {
    "diss_name": "QZone背景音乐",
    "diss_cover": "http://y.gtimg.cn/mediastyle/y/img/cover_qzone_130.jpg",
    "song_cnt": 1,
    "listen_num": 0,
    "dirid": 205,
    "tid": 0,
    "dir_show": 0
} */
function compare_diss_name() {
    axios.post('http://134.175.111.210:3300/user/songlist', {
        'id': 2421985222
    }).then(function (resp) {
        let arr = resp.data.data.list;
        arr.sort((a, b) => {
            return a.diss_name.localeCompare(b.diss_name) // 重点是这个比较函数
        })

        for (const { diss_name } of arr) {
            console.log(diss_name);
            fs.appendFile('./1.txt', diss_name + "\n", 'utf8', function (err) {
                if (err) {
                    throw new Error("追加数据失败")
                }
            });
        }
    })
}
function compare_song_cnt() {
    axios.post('http://134.175.111.210:3300/user/songlist', {
        'id': 2421985222
    }).then(function (resp) {
        let arr = resp.data.data.list;
        arr.sort((a, b) => {
            return b.song_cnt - a.song_cnt;
        });

        for (const { diss_name, song_cnt } of arr) {
            console.log(diss_name, song_cnt);
        }
    })
}
function compare_dirid() {
    axios.post('http://134.175.111.210:3300/user/songlist', {
        'id': 2421985222
    }).then(function (resp) {
        let arr = resp.data.data.list;
        arr.sort((a, b) => {
            return b.dirid - a.dirid;
        });

        for (const { diss_name, dirid } of arr) {
            console.log(diss_name, dirid);
        }
    })
}
// compare_diss_name();
// compare_song_cnt();
// compare_dirid();


// test
function compare_dirid() {
    axios.post('http://134.175.111.210:3300/user/songlist', {
        'id': 1090455174
    }).then(function (resp) {
        let arr = resp.data.data.list;
        arr.sort((a, b) => {
            return b.song_cnt - a.song_cnt;
        });

        for (const { diss_name, song_cnt } of arr) {
            console.log(diss_name, song_cnt);
        }
    })
}
compare_dirid()