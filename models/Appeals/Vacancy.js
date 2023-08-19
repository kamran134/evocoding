const mongoose = require("mongoose");
const vacancySchema = new mongoose.Schema({
    name: { type: String, require: true }
})

module.exports = mongoose.model("vacancyappeal", vacancySchema);