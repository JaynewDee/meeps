const User = require("../models/User");
const jwtAuth = require("../auth/index");

const api = require("express").Router();

api.post("/user", async (req, res) => {
  const { body } = req;
  try {
    const user = await User.findOne({ email: body.email });

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(403).json({ status: 403, message: "Wrong password!" });
    }
    const token = jwtAuth.sign(user);
    res.json({ status: 200, token, user });
  } catch (err) {
    console.log(err);
  }
});

api.post("/user/new", async (req, res) => {
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

module.exports = { api };
