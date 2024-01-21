const mongoose = require("mongoose");
const { Schema } = mongoose;

const Cda = new Schema({
   cdaKey: String,
   twitter: String,
   facebook: String,
   youtube: String
});

module.exports = mongoose.model('Cda', Cda);