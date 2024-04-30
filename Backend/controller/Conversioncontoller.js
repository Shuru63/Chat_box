const Conversation = require("../modal/Conversationmodal");
const Message = require("../modal/messagemodel");
const { getReceiverSocketId, io } = require("../Socket/Socket"); // Corrected import statement
const ErrorHandle = require("../Utils/ErrorHandle");

const sendMessage = async (req, res, next) => { // Added `next` parameter
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.message.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        return next(new ErrorHandle("Error in sendMessage controller:", 500));
    }
};

const getMessages = async (req, res, next) => { // Added `next` parameter
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); 

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.message;

        res.status(200).json(messages);
    } catch (error) {
        return next(new ErrorHandle("Internal server error:", 500));
    }
};

module.exports = {
    sendMessage,
    getMessages
};
