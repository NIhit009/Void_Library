const authRouter = require("express").Router();
const authController = require("../controller/authController");

authRouter.post("/signUp", authController.signUp);
authRouter.post("/getCode", authController.getCode);
authRouter.post("/login", authController.login);

module.exports = authRouter;