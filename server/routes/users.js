var express = require('express');
let db = require('../firebase-admin/database')
var router = express.Router();

// TODO: Flesh out to handle errors
function sendStatus(res, status) {
  res.status(status).send(JSON.stringify({ data: 'success'}))
}

/* GET users listing. */
router.get('/data', function(req, res, next) {
  let trackers = db.getUserTrackers(req.body.uid)
  res.status(200).send(JSON.stringify(req.body.uid));
});

router.post('/tracker', function(req, res, next) {
  let tracker = req.body.tracker
  let uid = req.body.uid
  db.addTrackerToUser(uid, sendStatus, tracker, res)
});

module.exports = router;
