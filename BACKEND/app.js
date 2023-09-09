const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const winston = require('winston');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const moment = require('moment');
require('dotenv').config();
const app = express();
const loginService = require('./service/login.service');

app.use(cors({
    origin: 'https://cda.xavi.tech'
}));

const loggerTime = moment().format('YYYY-MM-DD_HH-mm-ss');
const logFileName = `CDA_${timestamp}.log`;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `[CDA] ${timestamp} - [${level}]: ${message}`;
      })
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: `${logFileName}.log` }),
    ],
  });
  

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI,{
    keepAlive: true,
    keepAliveInitialDelay: 300000, 
    })
    .then(db => console.log('[CDA] MongoDB: connected'))
    .catch(err => {
        console.error('[CDA] MongoDB connection error:', err);
    });

ControllerRoute = require('./controller/controller');
app.use('/api', ControllerRoute);

/*
const adminUsr = "admin";//crypto.randomBytes(4).toString('hex');
const adminPwd = "admin";//crypto.randomBytes(4).toString('hex');
console.log("[CDA] Admin user: "+adminUsr);
console.log("[CDA] Admin password: "+adminPwd);
loginService.createAdmin({
    usr: adminUsr,
    pwd: adminPwd
});
*/

app.listen(process.env.CDA_PORT, () => {
    console.log("[CDA] API listening port: "+process.env.CDA_PORT);
});