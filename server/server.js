require("dotenv").config();

const express = require("express");

const { join } = require("path");

const http = require("http");

const cors = require("cors");

const { Server } = require("socket.io");

const app = express();

const db = require("./config/db");

const { apiRouter } = require("./api/routes");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  },
  perMessageDeflate: true
});

const PORT = process.env.PORT || 3001;

app.use(
  "/",
  express.static(
    join(
      __dirname,
      process.env.NODE_ENV === "production"
        ? "../client/dist"
        : "../client/index.html"
    )
  )
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

app.use("/api", cors(), apiRouter);

db.once("open", () => {
  server.listen(PORT, () => {
    console.info("Server listening @ ::: *:3001");
  });
});
