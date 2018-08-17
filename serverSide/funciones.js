var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require("./noteio-595fd-firebase-adminsdk-hmab5-c130884487.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://noteio-595fd.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();

exports.traerCartas = function(callback){
    var ref = db.ref("cartas");
    ref.once("value", function(snapshot) {
        callback(snapshot);
    });
}
