const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user.route.js");
const messageRoute = require("./routes/message.route.js");
const { app, server } = require("./SocketIO/server.js");


dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI);
    console.log("Connected to MongoDB");
} catch (error) {
    console.log(error);
}

//routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});