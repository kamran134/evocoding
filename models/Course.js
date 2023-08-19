const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    weeklyhour: { type: Number, require: true },
    totalhour: { type: Number, require: true },
    category: { type: String, require: true },
    subcategory: { type: String },
    subjects: { 
        type: Array,
        require:true,
    },
    keywords: { 
        type: Array,
        require:true,
    },

})
module.exports = mongoose.model("course", courseSchema);