const express = require("express");
const user = require("../Controller/userController.js");
const userRouter = express.Router();

// Register user
userRouter.post("/", user.registerUser);

// Login user
userRouter.post("/login", user.authUser);

module.exports = userRouter;
