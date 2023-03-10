const User = require("../models/User");
const jwtAuth = require("../auth/index");

async function loginUser(req, res) {
  const { body } = req;
  try {
    const user = await User.findOne({ email: body.email });

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: "Wrong password!" });
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

async function updateRoomHistory(req, res) {
  const { roomId } = req.query;
  const authorEmail = req.body.author;
  try {
    console.log(roomId);
    console.log(authorEmail);
    res.json({ status: 200, message: `Email: ${authorEmail}` });
  } catch (err) {
    console.error(err);
  }
}

module.exports = { loginUser, createUser, updateRoomHistory };
