const express = require("express");

const { protect } = require("../Middlewares/authMiddleware");
const Chat = require("../Controller/chatsController");
const chatsRouter = express.Router();

chatsRouter.post("/", protect, Chat.accessChat);
chatsRouter.get("/", protect, Chat.fetchChat);
// chatsRouter.post("/group", protect, createGroupChat);
// chatsRouter.put("/rename", protect, renameGroup); //rename by PUT request update data
// chatsRouter.put("/remove", protect, removeFromGroup); //remove user from group
// chatsRouter.put("/groupadd", protect, addToGroup); //Add user to group
module.exports = chatsRouter;
