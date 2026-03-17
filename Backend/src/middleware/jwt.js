const jwt = require("jsonwebtoken");
require("dotenv").config()
const User = require("../models/Users");

const signToken = (res, fullName, email) => {
    const token = jwt.sign({email, fullName}, process.env.JWT_SECRET_TOKEN, {expiresIn: "1h"});
    res.cookie("authCookie", token, {httpOnly: true, secure: true});
    return;
}
const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies["authCookie"];
        if (!token) return res.status(404).json({ message: "Token not provided.." });
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        if (!decoded) return res.status(400).json("Invalid Token..");
        const user = await User.findOne({email: decoded.email}).select("-password");
        if(!user) return res.status(400).json({message: "User not found.."});
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server error occurred while verifying token.."})
    }

}

module.exports = {
    signToken, verifyToken
}