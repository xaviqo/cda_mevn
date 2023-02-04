const mongoose = require("mongoose");
const { Schema } = mongoose;

const Actor = new Schema({
    name: String,
    age: Number,
    sex: String,
    height: String,
    hair: String,
    eyes: String,
    skills: [],
    languages: [],
    background: {
        awards: {
            active: {
                type: Boolean,
                default: false
            },
            values: []
        },
        formation: {
            active: {
                type: Boolean,
                default: false
            },
            values: []
        },
        experience: {
            active: {
                type: Boolean,
                default: false
            },
            values: []
        },
    },
    photos: [],
    videos: [],
    media: [],
    active: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Actor', Actor);