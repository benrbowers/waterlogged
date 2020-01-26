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

    
function getUserTrackers(uid, callback) {
    once(`/users/${uid}/trackers`, callback);
}

function addTrackerToUser(uid, callback, tracker, res) {
    tracker.uid = uid
    tracker.data = []
    console.log(getUserTrackers)
    getUserTrackers(uid, (snapshot) => {
        console.log('here2')
        let trackers = snapshot.val()
        if(trackers) {
            trackers[tracker.mac] = tracker
        } else {
            trackers = { [tracker.mac]: tracker}
        }

        console.log('tracker')
        set(`/users/${uid}/trackers`, trackers)
        callback(res, 200)
    });
} 

exports.getUserTrackers = this.getUserTrackers;
exports.addTrackerToUser = this.addTrackerToUser;

