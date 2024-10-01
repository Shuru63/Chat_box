const { getReceiverSocketId, io } = require("../SocketIO/server.js");
const Conversation = require("../models/conversation.model.js");
const Message = require("../models/message.model.js");
const translateMessage  = require("./translater.js");
 const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; 
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // await conversation.save()
    // await newMessage.save();
    await Promise.all([conversation.save(), newMessage.save()]); // run parallel
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

 const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id; 
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages");
    if (!conversation) {
      return res.status(201).json([]);
    }
    const messages = conversation.messages;
    res.status(201).json(messages);
  } catch (error) {
    console.log("Error in getMessage", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleTranslateMessage = async (req, res) => {
  const { preferredLanguage } = req.body;
  const { id: chatUser } = req.params;
  const senderId = req.user._id; 

  try {
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages");

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const messages = conversation.messages;
    const translatedMessages = await Promise.all(
      messages.map(async (item) => {
        const translatedMessage = await translateMessage(item.message, preferredLanguage);
        return translatedMessage; 
      })
    );

    console.log(translatedMessages);
    res.status(200).json({ messages: translatedMessages });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Translation failed" });
  }
};

module.exports = {
  sendMessage,
  getMessage,
  handleTranslateMessage,
};