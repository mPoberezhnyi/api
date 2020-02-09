const fs             = require('fs');
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const https          = require('https');
const http           = require('http');
const db             = require('./config/db');
const cors           = require('cors')
const app            = express();
const port = 8000;
const portHttp = 8030;

const privateKey  = fs.readFileSync('ca.key', 'utf8');
const certificate = fs.readFileSync('ca.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};



app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, { useNewUrlParser: true }, (err, database) => {
    if (err) return console.log(`
    ---------- ERROR ------------
    ${err}
    -----------------------------`);
    require('./app/routes')(app, database.db());
    var httpsServer = https.createServer(credentials, app);
    var httpServer = http.createServer(app);
    httpsServer.listen(port, () => {
        console.log('We are live on ' + port);
    });
    httpServer.listen(portHttp, () => {
        console.log('We are live on ' + portHttp);
    });
})