const nodemailer = require('nodemailer');
const Code = require("../models/Code");
require("dotenv").config();

const sendMail = async (email) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASS
            }
        });
        const code = Math.floor(Math.random() * (100000 - 999999 + 1)) + 1000000;
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Verification Email",
            html: `<h1>Your verification code is:<h1>
                <h2>${code}
                `
        };
        const newCode = new Code({email, Code: code});
        await newCode.save()
        await transporter.sendMail(mailOptions);
        return;
    } catch (error) {
        console.log(error);
    }

}

module.exports = sendMail;