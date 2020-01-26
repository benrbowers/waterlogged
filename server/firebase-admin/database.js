const admin = require('./admin');
let db = admin.database();
const test = 'l'

function on(url, callback) {
	return db.ref(url).on("value", callback, (error) => console.log(error));
}

function once(url, callback) {
	return db.ref(url).once("value", callback, (error) => console.log(error));
}

function set(url, data) {
    return db.ref(url).set(data)
}

function push(url, data) {
    return db.ref(url).push(data)
}

    
function getUserTrackers(uid, callback) {
    once(`/users/${uid}/trackers/`, callback);
}

function getTrackers(callback) {
    once(`/trackers/`, callback);
}

function getToken(mac, callback, res) {
    once(`/trackers`, (snapshot) => {
        let trackers = snapshot.val()
        if(trackers[mac]) {
            callback(200, trackers[mac], res)
        } else {
            callback(404, { "data": "MAC address was not found" }, res)
        }
    });
}

function addTracker(uid, tracker, token) {
    tracker.token = token
    tracker.uid = uid
    getTrackers((snapshot) => {
        console.log('here2')
        let trackers = snapshot.val()
        console.log(trackers)
        if(trackers) {
            trackers[tracker.mac] = tracker
        } else {
            trackers = { [tracker.mac]: tracker}
        }
        set(`/trackers`, trackers)
    });
}

function addTrackerToUser(uid, callback, tracker, res) {
    tracker.uid = uid
    getUserTrackers(uid, (snapshot) => {
        let trackers = snapshot.val()
        if(trackers) {
            trackers[tracker.mac] = tracker
        } else {
            trackers = { [tracker.mac]: tracker}
        }
        set(`/users/${uid}/trackers`, trackers)
        callback(res, 200)
    });
} 

function addDataPoint(uid, mac, elapsedTime, timestamp) {
    console.log('here2')
    push(`/users/${uid}/trackers/${mac}/data`, {
        elapsedTime,
        timestamp
    })
}

exports.getUserTrackers = getUserTrackers;
exports.addTrackerToUser = addTrackerToUser;
exports.addTracker = addTracker;
exports.getTrackers = getTrackers;
exports.getToken = getToken;
exports.addDataPoint = addDataPoint;

