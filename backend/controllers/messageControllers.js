const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const db = require("../models");
const User = db.userModel;
const Chat = db.chatModel;

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res, next) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.sendStatus(400);
  }

  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    // Use populate with execPopulate method on the sender and chat fields
    message = await Message.populate(message, [
      { path: "sender", select: "name pic" },
      { path: "chat" },
    ]);

    // Populate the chat.users field of the message
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    // Update the latestMessage field in the Chat model
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    next(error);
  }
});


module.exports = { allMessages, sendMessage };
