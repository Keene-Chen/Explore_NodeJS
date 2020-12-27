const express = require('express');
const router = express.Router();
const Mock = require('mockjs');

router.get('/', (req, res) => {
  res.send(Mock.mock({ 'string|1-10': '★' }));
  //console.log(res);
});

module.exports = router;
