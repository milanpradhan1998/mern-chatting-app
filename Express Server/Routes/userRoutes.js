const express = require("express");
const user = require("../Controller/userController.js");
const { protect } = require("../Middlewares/authMiddleware");
const userRouter = express.Router();

// Register user
userRouter.post("/", user.registerUser);

// Login user
userRouter.post("/login", user.authUser);

//all users search
userRouter.get("/", protect, user.allUsers);

module.exports = userRouter;
