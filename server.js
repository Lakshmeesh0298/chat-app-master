const express = require("express");
app = express();
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
// internal imports
const dbConnect = require("./config/db");
const { PORT, NODE_ENV } = require("./config/index");
const authRoute = require("./routes/auth/authRoute");
const adminRoute = require("./routes/admin/adminRoutes");
const studentRoute = require("./routes/student/studentRoute");
const chatRoute = require("./routes/chat/converstionRouter");
const { addUser, removeUser, getUser } = require("./socket/index");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const socketStart = () => {
  io.on("connection", socket => {
    //when ceonnect
    console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", userId => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });

    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
};
socketStart();
const startServer = () => {
  try {
    dbConnect();
    // middlewares
    if (NODE_ENV === "development") {
      app.use(morgan("dev"));
    }

    app.use(cors({ origin: "http://localhost:3000" }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // Route Part
    app.use("/auth", authRoute);
    app.use("/admin", adminRoute);
    app.use("/users", studentRoute);
    app.use("/chat", chatRoute);

    app.listen(PORT, () => console.log(`server running on port ` + PORT));
  } catch (error) {
    console.log(error);
  }
};
startServer();
