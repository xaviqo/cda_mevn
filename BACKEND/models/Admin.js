const mongoose = require("mongoose");
const { Schema } = mongoose;

const Admin = new Schema({
    user: String,
    password: String
});

module.exports = mongoose.model('Admin', Admin);