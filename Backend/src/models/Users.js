const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model("User", userSchema);