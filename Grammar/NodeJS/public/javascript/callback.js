/*
 * @Author: HelloChen
 * @Date: 2020-09-10 09:39:33
 * @LastEditors: HelloChen
 * @LastEditTime: 2020-09-13 15:26:00
 * @FilePath: /NodeJS/public/javascript/callback.js
 * @Description: file content
 */

// fs module
const fs = require('fs');

/** Call example
 * getID('./public/json/1.json', (data) => {
 * const data1 = JSON.parse(data);
 * data1.forEach((element) => {
 * console.log(element.id);
 * });
 * });
 */

/**
 * @description Get the ID in the file.
 * @param {string} path - requestAddress.
 * @param {function} callback - requestCallback.
 */
function get(path, callback) {
  fs.readFile(path, (err, data) => {
    if (err) throw err;
    callback(data.toString('utf8'));
  });
}

/**
 * @description: Test callback function.
 * @param {function} callback - requestCallback.
 */
function huidiao(callback) {
  console.log('l');
  setTimeout(() => {
    const data = 'hello';
    callback(data);
  }, 1000);
}

module.exports = { get, huidiao };
