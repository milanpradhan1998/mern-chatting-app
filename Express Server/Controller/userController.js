const asyncHandler = require("express-async-handler");
const User = require("../Model/userModel");
const generateToken = require("../Config/generateToken");
const { request, response } = require("express");

module.exports.registerUser = asyncHandler(async (request, response) => {
  const { name, email, password, pic } = request.body;
  if (!name || !email || !password) {
    response.status(400).send("Hello from userRoutes and controller");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    response.status(400);
    throw new Error("User already exist!");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    response.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    response.status(400);
    throw new Error("Unable to create user.");
  }
});

module.exports.authUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;
  console.log(email, password);
  const user = await User.findOne({ email });
  console.log(user);
  if (user === null) {
    response.status(400);
    throw new Error("This Email Id not register.");
  }
  if (user && (await user.matchPassword(password))) {
    response.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    response.status(400);
    throw new Error("Password Not match");
  }
});

//allUser
module.exports.allUsers = asyncHandler(async (request, response) => {
  const keywords = request.query.search
    ? {
        $or: [
          { name: { $regex: request.query.search, $options: "i" } },
          { email: { $regex: request.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keywords).find({
    _id: { $ne: request.user._id },
  });
  response.status(200).send(users);
});
