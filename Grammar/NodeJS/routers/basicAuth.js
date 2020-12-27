const express = require('express');
const router = express.Router();
//const auth = require('basic-auth');
const { base64encode, base64decode } = require('nodejs-base64');
const superagent = require('superagent');

// app.use(express.basicAuth('admin', 'public'));

/* router.get('/', function (req, res) {
  $.get('http://134.175.221.21:8081/api/v4/brokers').then((data) => {
    res.json(data);
  });
}); */

function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = base64encode(tok);
  return 'Basic ' + hash;
}
const auth = make_base_auth('admin', 'public');

/* superagent.get("http://134.175.221.21:8081/api/v4/brokers")
.auth('admin','public')
.end((err,res)=>{
    if(err)throw err;
    console.log(res.text);
}) */

/* $.ajax({
  url: 'http://134.175.221.21:8081/api/v4/brokers',
  method: 'GET',
  beforeSend: function (req) {
    req.setRequestHeader('Authorization', auth);
  },
  success: function (msg) {
    console.log(msg);
  },
}); */

module.exports = router;
