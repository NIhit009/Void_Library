const mongoose = require("mongoose");

const connectDB = async (url) => {
    try {
        const connect = await mongoose.connect(url);
        console.log("CONNECTED TO THE DATABASE.. ",connect.connection.host);
    } catch (error) {
        console.log("Failed to connect to the database", error);
    }
};

module.exports = connectDB;