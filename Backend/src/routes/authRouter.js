const authRouter = require("express").Router();
const authController = require("../controller/authController");

authRouter.post("/signUp", authController.signUp);

module.exports = authRouter;