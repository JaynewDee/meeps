require("dotenv").config();
const { join } = require("path");

const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const db = require("./config/db");
const { api } = require("./api/routes");

const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*"
  },
  perMessageDeflate: false
});

io.on("connection", (socket) => {
  console.info("A socket user has connected.");

  // On connection, join the main room `central`
  socket.join("central");

  socket.on("chat message", (msg) => {
    console.log(`Message from socket client: ${msg.toString()}`);
    if (!msg) return;

    try {
      io.emit("chat message", msg);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("disconnect", () => {
    console.warn("A socket user has disconnected.");
  });
});
// ! Do not change from 3001 !
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

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

app.use("/api", cors(), api);

db.once("open", () => {
  server.listen(PORT, () => {
    console.info("Server listening @ ::: *:3001");
  });
});

module.exports = server;
