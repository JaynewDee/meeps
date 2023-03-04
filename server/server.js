const express = require("express");

const { join } = require("path");

const { Server } = require("socket.io");

const server = express();

const io = new Server(server, {
  cors: {
    origin: "*"
  },
  perMessageDeflate: true
});

const PORT = process.env.PORT || 3001;

server.get("*", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
  } else {
    res.sendFile(join(__dirname, "../client/index.html"));
  }
});

io.on("connection", (socket) => {
  console.info("A socket user has connected.");

  socket.on("chat message", (msg) => {
    console.log(`Message from socket client: ${msg}`);
    if (!msg) {
      return;
    }
    try {
      socket.broadcast.emit("chat message", msg);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("disconnect", () => {
    console.warn("A socket user has disconnected.");
  });
});

server.listen(PORT, () => {
  console.info("Server listening @ ::: *:3001");
});
