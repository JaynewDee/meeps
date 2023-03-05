const User = require("../models/User");

const htmlRouter = require("express").Router();

htmlRouter.get("*", (req, res, next) => {
  res.sendFile(join(__dirname, "../client/index.html"));
});

const apiRouter = require("express").Router();

apiRouter.post("/user", async (req, res, next) => {
  const { body } = req;
  console.log(body);
  res.status(200).json({ message: "Hello!" });
  //   const user = await User.create(body);
});

module.exports = { htmlRouter, apiRouter };
