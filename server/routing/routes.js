const User = require("../models/User");
const jwtAuth = require("../auth/index");
const { join } = require("path");

const apiRouter = require("express").Router();

apiRouter.post("/user/new", async (req, res, next) => {
  const { body } = req;
  const user = await User.create(body);
  console.log(user);
  const token = jwtAuth.sign(body);
  console.log(token);
  res.json({ token });
});

module.exports = { apiRouter };
