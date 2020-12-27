const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.url !== '/favicon.ico') {
    res.send('主页');
  }
});

router.get('/home', (req, res) => {
  res.send(req.url);
  console.dir(req.url);
  // res.send('主页1');
});

router.get('/about', function (req, res) {
  res.render('about.html', {
    data: {
      name: 'aui',
      tags: ['art', 'template', 'nodejs'],
    },
  });
});

module.exports = router;
