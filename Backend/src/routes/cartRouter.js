const cartRouter = require("express").Router();
const cartController = require("../controller/cartController");

cartRouter.get("/cartItems", cartController.getAllCartItems);
cartRouter.post("/addCart/:userId", cartController.addToCart)
module.exports = cartRouter;