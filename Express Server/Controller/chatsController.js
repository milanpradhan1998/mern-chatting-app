const { request, response } = require("express");
const asyncHandler = require("express-async-handler");
const { Error } = require("mongoose");
const { findByIdAndUpdate } = require("../Model/chatModel");
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

// CREATE GROUP CHAT
module.exports.createGroupChat = asyncHandler(async (request, response) => {
  if (!request.body.users || !request.body.name) {
    return response
      .status(400)
      .send({ message: "Please fill all the felids." });
  }
  var users = JSON.parse(request.body.users);
  if (users.length < 2) {
    return response
      .status(400)
      .send({ message: "More then 2 user require to form a group chat." });
  }
  users.push(request.user); //to add your shelf in the group chat. who has create the group.
  try {
    const groupChat = await Chat.create({
      chatName: request.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: request.user,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    response.status(200).json(fullGroupChat);
  } catch (error) {
    response.status(400);
    throw new Error(error.message);
  }
});

// Rename Group
module.exports.renameGroup = asyncHandler(async (request, response) => {
  const { chatId, chatName } = request.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!updatedChat) {
    response.status(404);
    throw new Error("Chat not found");
  } else {
    response.json(updatedChat);
  }
});

//Add USER To Group
module.exports.addToGroup = asyncHandler(async (request, response) => {
  const { chatId, userId } = request.body;
  const added = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!added) {
    response.status(404);
    throw new Error("Chat not found");
  } else {
    response.json(added);
  }
});
// Remove User From Group Chat
module.exports.removeFromGroup = asyncHandler(async (request, response) => {
  const { chatId, userId } = request.body;
  const removed = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!removed) {
    response.status(404);
    throw new Error("Chat not found");
  } else {
    response.json(removed);
  }
});
