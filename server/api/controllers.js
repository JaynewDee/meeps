const User = require("../models/User");
const jwtAuth = require("../auth");

async function loginUser(req, res) {
  const { body } = req;
  try {
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.status(400).json({ status: 400, message: "No user found." });
    }
    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ status: 400, message: "Wrong password!" });
    }

    const token = jwtAuth.sign(user);
    res.json({ status: 200, token, user });
  } catch (err) {
    console.log(err);
  }
}

async function createUser(req, res) {
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
}

async function storeUserMsg(req, res) {
  const { author, text } = req.body;
  const roomId = req.query.roomId;
  console.log(roomId);
  console.log(author, text);
  res.json({ status: 200, message: `Email: ${text}` });
}

module.exports = { loginUser, createUser, storeUserMsg };
