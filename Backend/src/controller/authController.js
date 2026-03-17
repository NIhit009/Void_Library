const { check, validationResult } = require("express-validator");
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const Code = require("../models/Code");
const emailSender = require("../middleware/sendEmail");
const { signToken } = require("../middleware/jwt");
require("dotenv").config();
exports.signUp = [
    check("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full Name cannot be empty..")
        .isString()
        .withMessage("Should be a String.."),
    // add regex to see if there is space between first name and second name
    check("email")
        .trim()
        .isEmail()
        .withMessage("Email should be in the correct format.."),
    check("phoneNumber")
        .isNumeric()
        .withMessage("Phone Number should be a Number...")
        .isLength({ min: 10, max: 10 })
        .withMessage("Phone Number Should only be of 10 digits.."),
    check("password")
        .trim()
        .isLength({ min: 6, max: 10 })
        .isStrongPassword()
        .withMessage("Please enter a Strong password.."),
    check("confirmPassword")
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password do not match..");
            }
            return true;
        }),
    async (req, res) => {
        try {
            const { fullName, email, phoneNumber, password, code } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }
            const user = await User.findOne({ email: email });
            if (user) return res.status(400).json({ message: "User already exsists" });
            const saltRounds = 10;
            const hashedPass = await bcrypt.hash(password, saltRounds);
            const verifyCode = await Code.findOne({email});
            if(!code){
                return res.status(400).json({message: "Code not provided.."});
            }
            if (code !== verifyCode.Code) {
                return res.status(404).json({ message: "Invalid code.." });
            }
            const codeCreatedTime = verifyCode.createdAt.getTime();
            const codeExpireTime = Math.floor(codeCreatedTime / 1000) + verifyCode.expiresIn;
            const nowTimeinSeconds = Math.floor(Date.now() / 1000);
            if (codeExpireTime < nowTimeinSeconds){
                return res.status(400).json({message : "Code has already expired"});
            }
            const verified = true;
            const newUser = new User({ fullName, email, password: hashedPass, phoneNumber, isVerified: verified });
            await newUser.save();
            signToken(res, newUser.fullName, newUser.email);
            return res.status(200).json({ message: "New User is saved.." });
        } catch (error) {
            console.log("Error while Signing up..", error);
            return res.status(500).json({ message: "Server error occured while signing up.." });
        }
    }]

exports.getCode = [
    check("email")
        .trim()
        .isEmail()
        .withMessage("Email should be in the correct format.."),
    (req, res) => {
        const { email } = req.body
        try {
            emailSender(email);
            return res.status(200).json({ message: "Code sent.." });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Error while sending the code.." })
        }

    }]


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Details.." });
        const checkPassword = bcrypt.compare(password, user.password);
        if (!checkPassword) return res.status(404).json({ message: "Invalid Details.." });
        signToken(res, user.fullName, user.email);
        return res.status(200).json({ message: "Login Successfull" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error occured while logging in.." });
    }
}