const express = require('express');
const router = express.Router();
const $ = require('jquery');

/* const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
router.post('/api',urlencodedParser,(req,res)=>{
  console.dir(req.body);
  res.send(req.body)
}) */

router.get('/', function (req, res) {
  console.log(req.body);
  res.cookie('username','cookie',{maxAge:1000*60*60});
  res.send('hello')
});

router.get('/cookie', (req, res) => {
  res.send(req.cookies);
  console.log(req.cookies);
});

module.exports = router;
