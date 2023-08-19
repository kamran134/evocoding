const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        firstname: { type: String, require: true },
        password: { type: String, require: true },
        token: { type: String },
    }
)
module.exports = mongoose.model("user", userSchema, "user");