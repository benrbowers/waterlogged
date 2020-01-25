var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/api/data', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/api/data', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/api/data', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/api/data', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
