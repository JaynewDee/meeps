const User = require("../models/User");
const jwtAuth = require("../auth/index");

const htmlRouter = require("express").Router();

htmlRouter.get("*", (_, res) => {
  res.sendFile(join(__dirname, "../client/index.html"));
});

const apiRouter = require("express").Router();

apiRouter.post("/user/new", async (req, res, next) => {
  const { body } = req;
  console.log(body);
  res.status(200).json({ message: "Hello!" });
  const user = await User.create(body);
  const token = jwtAuth.sign(body);
});

module.exports = { htmlRouter, apiRouter };
