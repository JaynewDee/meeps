const User = require("../models/User");
const jwtAuth = require("../auth/index");
const { join } = require("path");

const apiRouter = require("express").Router();

apiRouter.post("/user/new", async (req, res, next) => {
  const { body } = req;
  // const user = await User.create(body);
  // const token = jwtAuth.sign(body);
  // res.json({ user, token });
});

module.exports = { apiRouter };
