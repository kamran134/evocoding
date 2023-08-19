const mongoose = require("mongoose");
const HomeSchema = new mongoose.Schema({
    text: { type: String, require: true },
    img: { type: String, require: true },
})
module.exports = mongoose.model('home', HomeSchema, 'home');