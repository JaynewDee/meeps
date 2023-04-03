const User = require("../models/User");
const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/Message");
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
      return res.status(401).json({ status: 401, message: "Wrong password!" });
    }

    const token = jwtAuth.sign(user);
    console.log(token);
    res.cookie("jwt", token, { httpOnly: true });
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
  const newMsg = await Message.create({ text, author, recipient: roomId });

  await ChatRoom.findOneAndUpdate(
    { _id: roomId },
    { $push: { messages: newMsg._id } }
  );

  res.json({ status: 200, message: `MESSAGE DEETS: ${newMsg}` });
}

async function getAllRooms(req, res) {
  const allRooms = await ChatRoom.find({}).populate("messages");
  res.json({ status: 200, data: allRooms });
}

async function getRecentMessages(req, res) {
  try {
    const recentMsgs = await Message.find().sort({ createdAt: 1 }).limit(50);
    res.json({ status: 200, data: recentMsgs });
  } catch (err) {
    console.error(err);
  }
}

async function getMe(req, res) {}

module.exports = {
  loginUser,
  createUser,
  storeUserMsg,
  getAllRooms,
  getMe,
  getRecentMessages
};
