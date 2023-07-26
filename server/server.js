require("dotenv").config();
const {
  join
} = require("path");

const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const launchSocket = require('./socket');
const db = require("./config/db");
const {
  api
} = require("./api/routes");

const server = http.createServer(app);

launchSocket(server)

// ! Do not change from 3001 !
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(cookieParser());

app.use(
  "/",
  express.static(
    join(
      __dirname,
      process.env.NODE_ENV === "production" ?
      "../client/dist" :
      "../client/index.html"
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