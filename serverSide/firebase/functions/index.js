const functions = require('firebase-functions');

var express = require('express');
var url = require('url');
var app = express();
var funciones = require('./funciones')

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://noteio.tk');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
var RateLimit = require('express-rate-limit');
 
var limiter = new RateLimit({
  windowMs: 10*60*1000, // 10 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});
 
//  apply to all requests
app.use('/crearCarta',limiter);

app.get('/', (req, res)=>{
    funciones.prueba();
    res.send('...')
});

app.post('/traerCartas', (req, res)=>{
    funciones.traerCartas(function(resultado){
        res.send(resultado);
    })
})

app.post('/crearCarta', (req, res)=>{
    var losDatos = url.parse(req.url, true).query.losDatos;
    funciones.crearCarta(losDatos, function(resultado){
        res.send(resultado)
    })
})

exports.app = functions.https.onRequest(app)