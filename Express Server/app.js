const { request, response } = require("express");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const chats = require("./data/data");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 7700;

// cors enable
app.use(cors());

app.get("/", (request, response) => {
  response.send("Express server is running on port :7700");
});
//CHAT DATA API
app.get("/api/chat/", (request, response) => {
  response.send(chats);
});
//SINGLE USER CHAT DATA USING ID.
app.get("/api/chat/:id", (request, response) => {
  let { id } = request.params;
  console.log(id);
  let singleChat = chats.find((c) => c._id === request.params.id);
  console.log(singleChat);
  response.send(singleChat);
});

app.listen(PORT, () => {
  console.log("status:", true);
  console.log(`Server is running on port:${PORT}`);
});
