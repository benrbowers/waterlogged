var express = require('express');
let db = require('../firebase-admin/database')
var router = express.Router();

// TODO: Flesh out to handle errors
function sendStatus(res, status) {
  res.status(status).send(JSON.stringify({ data: 'success'}))
}

/* Get User trackers */
router.get('/data', function(req, res, next) {
  let trackers = db.getUserTrackers(req.body.uid)
  res.status(200).send(JSON.stringify(req.body.uid));
});

router.post('/tracker', function(req, res, next) {
  let tracker = req.body.tracker
  let token = req.body.token
  let uid = req.body.uid

  db.addTracker(uid, tracker, token)
  db.addTrackerToUser(uid, sendStatus, tracker, res)
});

//Pi POST
router.post('/updateData/:uid/:mac/:elapsedTime/:timestamp', function(req, res, next) {
  let uid = req.params.uid
  let elapsedTime = req.params.elapsedTime
  let timestamp = req.params.timestamp
  let mac = req.params.mac
  console.log('here')
  db.addDataPoint(uid, mac, elapsedTime, timestamp)
  res.status(200).send(JSON.stringify({ data: 'success'}))
});

module.exports = router;
