const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    status: {
        type: String,
        default: "Active"
    }
},{timestamps: true})

module.exports = mongoose.model("Cart", cartSchema);