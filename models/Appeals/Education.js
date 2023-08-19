const mongoose = require("mongoose");
const educationSchema = mongoose.Schema({
    firstname: { type: String, require: true },
    secondname: { type: String, require: true },
    mobile: { type: Number, require: true },
    email: { type: String, require: true },
    field: { type: String, require: true },
});
module.exports = mongoose.model("education", educationSchema);