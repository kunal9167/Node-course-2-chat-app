const path = require("path");
const http = require("http");
var express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New User connected");

  socket.emit("newMessage", {
    from: "Ishita",
    text: "Heya",
    createAt: 245
  });

  socket.on("createMessage", message => {
    console.log("create Message ", message);
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});

server.listen(port, () => {
  console.log("Server is up on port 3000");
});