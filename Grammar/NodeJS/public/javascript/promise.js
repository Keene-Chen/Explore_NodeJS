const fs = require('fs');
const $ = require('./callback');

function get(path) {
  return new Promise((resolve, reject) => {
    $.get(path, (data) => {
      resolve(data);
    });
  });
}

get('./public/json/data.json').then((data)=>{
  console.log(data);
})