const User = require("../models/User");
const jwtAuth = require("../auth/index");
const { join } = require("path");

const apiRouter = require("express").Router();

apiRouter.post("/user", async (req, res, next) => {
  const { body } = req;
  try {
    const user = await User.findOne({ email: body.email });
    console.log(user);
  } catch (err) {
    console.log(err);
  }
});

apiRouter.post("/user/new", async (req, res, next) => {
  const { body } = req;
  try {
    const user = await User.create(body);

    const token = jwtAuth.sign(user);

    res.json({ status: 200, token, user });
  } catch (err) {
    if (err.code === 11000) {
      res.json({ status: 208 });
    } else {
      res.json({ status: 500, message: "Oops! Something broke ..." });
    }
  }
});

module.exports = { apiRouter };
