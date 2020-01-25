var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/data', function(req, res, next) {
  res.status(200).send(JSON.stringify(req.body.uid));
});

module.exports = router;
