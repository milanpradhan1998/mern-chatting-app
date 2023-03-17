const { request, response } = require("express");
const asyncHandler = require("express-async-handler");
const Chat = require("../Model/chatModel");
const User = require("../Model/userModel");

module.exports.accessChat = asyncHandler(async (request, response) => {
  const { userId } = request.body;
  // Searching and Verifying the user is exist or not
  if (!userId) {
    console.log("UserId params not sent with request");
    return response.sendStatus(400);
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: request.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  if (isChat.length > 0) {
    response.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [request.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      response.status(200).send(fullChat);
    } catch (error) {
      response.status(400);
      throw new Error(error.message);
    }
  }
});

//Fetch chats
module.exports.fetchChat = asyncHandler(async (request, response) => {
  try {
    Chat.find({
      users: { $elemMatch: { $eq: request.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        result = await User.populate(result, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        response.status(200).send(result);
      });
  } catch (error) {}
});
