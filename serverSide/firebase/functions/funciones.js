var admin = require("firebase-admin");
var serviceAccount = require("./noteio-595fd-firebase-adminsdk-hmab5-c130884487.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "FAKE DTB URL"
});

var db = admin.database();

exports.traerCartas = function(callback){
    var ref = db.ref("cartas");
    ref.once("value", function(snapshot) {
        callback(JSON.stringify(snapshot));
    });
}

exports.crearCarta = function(losDatos, callback){
    var datos = JSON.parse(decodeURIComponent(losDatos));
    var escritura = datos['escritura'];
    var titulo = datos['titulo'];
    var ref = db.ref("cartas");
    ref.push().set({
        'Escritura': escritura,
        'Titulo': titulo
    }, ()=>{
        callback('HECHO');
    })

}