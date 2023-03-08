const { request, response, json } = require("express");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");
const chats = require("./data/data");
const { default: mongoose } = require("mongoose");
// API ROUTES
const userRouter = require("./Routes/userRoutes");
// Error Handler
const { notFound, errorHandler } = require("./Middlewares/errorMiddlewares");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 7700;

// cors enable
app.use(cors());
//json enable
app.use(express.json());
//Mongo DB url
const MONGODB_URI =
  "mongodb+srv://Admin:768028@mymongodb.ltaknvt.mongodb.net/ChatApp?retryWrites=true&w=majority";

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

//user-Routes api
app.use("/api/user", userRouter);

// Error Handler
app.use(notFound);
app.use(errorHandler);

//Mongoose connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("::Mongo DB Connection Successful::".green.bold);
      console.log("status:true".green.bold);
      console.log(`Server is running on port:${PORT}`.green.bold);
    });
  })
  .catch((error) => {
    console.log("DB connection Error!! ::".red.bold, error);
    process.exit();
  });
