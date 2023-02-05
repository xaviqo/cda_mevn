const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();
const app = express();
const loginService = require('./service/login.service');

app.use(cors({
    origin: 'http://localhost:1337'
}))

/*
app.use(cors({
    origin: 'http://130.162.47.190'
}))
*/

// Settings
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(db => console.log('[CDA] MongoDB: connected'))
    .catch(err => console.log(err));

ControllerRoute = require('./controller/controller');
app.use('/api', ControllerRoute);

/*const adminUsr = crypto.randomBytes(4).toString('hex');
const adminPwd = crypto.randomBytes(4).toString('hex');
console.log("[CDA] Admin user: "+adminUsr);
console.log("[CDA] Admin password: "+adminPwd);
loginService.createAdmin({
    usr: adminUsr,
    pwd: adminPwd
});
*/

app.listen(process.env.CDA_PORT, () => {
    console.log("[CDA] API listening port: "+process.env.CDA_PORT);
})