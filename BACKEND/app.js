const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const app = express();

/*app.use(cors({
    origin: 'http://localhost:1337'
}))*/

app.use(cors({
    origin: 'http://130.162.47.190/'
}))

/*app.use(function (req,res,next) {
    res.header("Access-Control-Allow-Origins","http://localhost:1337");
    res.header("Access-Control-Allow-Methods","GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers","auth-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/

// Settings
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(db => console.log('[CDA] MongoDB: connected'))
    .catch(err => console.log(err));

ControllerRoute = require('./controller/controller');
app.use('/api', ControllerRoute);

app.listen(process.env.CDA_PORT, () => {
    console.log("[CDA] API listening port: "+process.env.CDA_PORT);
})