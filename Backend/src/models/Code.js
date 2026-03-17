const mongoose = require("mongoose");

const codeSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    Code: {
        type: Number,
        required: true
    },
    expiresIn: {
        type: Number,
        default: "300",
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model("Code", codeSchema);