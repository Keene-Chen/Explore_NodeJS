const moment = require('moment');

const a=moment(1600146635059).format("dddd, MMMM Do YYYY, h:mm:ss a");
const b=moment(1600146635059).format("YYYY-MM-DD HH:mm:ss");

console.log(a);
console.log(b);
