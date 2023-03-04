const express = require("express");

const { join } = require("path");

const http = require("http");

const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  },
  perMessageDeflate: true
});

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "../client/dist")));
} else {
  app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "../client/index.html"));
  });
}

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
