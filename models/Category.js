const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: { type: String, require: true },
    keyword: { type: String, require: true ,unique : true},
    subcategories: [],
}, { versionKey: false });
module.exports = mongoose.model("category", categorySchema);