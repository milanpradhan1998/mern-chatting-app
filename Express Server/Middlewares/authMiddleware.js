const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../Model/userModel");
const { request, response } = require("express");

const protect = asyncHandler(async (request, response, next) => {
  console.log(request.headers.authorization);
  let token;
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = request.headers.authorization.split(" ")[1];

      //decode token id
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      request.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      response.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    response.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
