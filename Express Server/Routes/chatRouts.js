const express = require("express");

const { protect } = require("../Middlewares/authMiddleware");
const Chat = require("../Controller/chatsController");
const chatsRouter = express.Router();

chatsRouter.post("/", protect, Chat.accessChat);
chatsRouter.get("/", protect, Chat.fetchChat);
chatsRouter.post("/group", protect, Chat.createGroupChat);
chatsRouter.put("/rename", protect, Chat.renameGroup); //rename by PUT request update data
chatsRouter.put("/groupadd", protect, Chat.addToGroup); //Add user to group
chatsRouter.put("/remove", protect, Chat.removeFromGroup); //remove user from group

module.exports = chatsRouter;
