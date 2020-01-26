var express = require('express');
let db = require('../firebase-admin/database')
var router = express.Router();

function sendStatus(status, body, res) {
  res.status(status).send(JSON.stringify(body))
}

/* GET home page. */
router.get('/token/:mac', function(req, res, next) {
  db.getToken(req.params.mac, sendStatus, res)
});

module.exports = router;
