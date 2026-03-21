const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema({
    cart_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Cart"
    },
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Book"
    },
    quantity: {
        type: Number,
        required: true
    },
    added_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("CartItem", cartItemSchema);