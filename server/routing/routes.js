const User = require("../models/User");

const htmlRouter = require("express").Router();

htmlRouter.get("*", (req, res, next) => {
  res.sendFile(join(__dirname, "../client/index.html"));
});

const apiRouter = require("express").Router();

apiRouter.get("/user", (req, res, next) => {});

module.exports = htmlRouter;
