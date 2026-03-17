const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./utils/db");
const authRouter = require("./routes/authRouter");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use("/VoidLibrary/auth", authRouter);

app.listen(port, () => {
    connectDB(process.env.MONGO_URI);
    console.log(`Server is running in ${port}`);
})