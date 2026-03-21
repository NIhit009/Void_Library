const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
exports.getAllCartItems = async (req, res) => {
}

exports.addToCart = async (req, res) => {
    try {
        const {book_id} = req.body;
        const user_id = req.params.userId;
        const cart = await Cart.find({user_id});
        if (!cart) {
            const newCart = new Cart({user_id});
            await newCart.save();
            const getNewCart = Cart.find({user_id});
            const cart_id = getNewCart._id;
            const cartItem = new CartItem({cart_id, book_id});
            await cartItem.save();
        }

    } catch (error) {
        console.log(error);
        
    }
}