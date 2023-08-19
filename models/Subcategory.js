const mongoose = require("mongoose");
const subcategorySchema = new mongoose.Schema({
    name: { type: String, require: true },
    keyword: { type: String, require: true, unique: true },
})
module.exports = mongoose.model("subcategory", subcategorySchema);