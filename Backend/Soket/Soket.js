const Server = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const socketIoServer = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {};

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

socketIoServer.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") userSocketMap[userId] = socket.id;

    socketIoServer.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        socketIoServer.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

module.exports = { app, server, getReceiverSocketId };