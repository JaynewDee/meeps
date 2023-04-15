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
    res.cookie("jwt", token, { httpOnly: true });
    res.json({ status: 200, token, user });
  } catch (err) {
    console.error(err);
  }
}

/////////////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////////

// Persist a new message
async function storeUserMsg(req, res) {
  const { author, text } = req.body;
  const roomName = req.query.roomName;
  const toRoom = await ChatRoom.findOne({ name: roomName });

  const created = await Message.create({
    text,
    author,
    recipient: toRoom._id
  });

  const newMsg = await Message.findOne({ _id: created._id }).populate({
    path: "author",
    select: "email firstName lastName username"
  });

  await User.findOneAndUpdate(
    { _id: author },
    { $push: { messages: newMsg._id } }
  );

  await ChatRoom.findOneAndUpdate(
    { name: roomName },
    { $push: { messages: newMsg._id } }
  );

  res.json({ status: 200, message: newMsg });
}

/////////////////////////////////////////////////////////////////////////////////////

async function getAllRooms(req, res) {
  const allRooms = await ChatRoom.find({}).populate("messages");
  res.json({ status: 200, data: allRooms });
}

/////////////////////////////////////////////////////////////////////////////////////

// Send 50 most recent messages
async function getRecentMessages(req, res) {
  try {
    const recentMsgs = await Message.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .populate({
        path: "author",
        select: "email firstName lastName username"
      });
    res.json({ status: 200, data: recentMsgs });
  } catch (err) {
    console.error(err);
  }
}

/////////////////////////////////////////////////////////////////////////////////////

async function getMe(req, res) {
  const ownUser = await User.findOne(
    {
      email: "jdiehl2236@gmail.com"
    },
    ["email username firstName lastName"]
  )
    .populate({ path: "messages" })
    .populate({ path: "rooms" });
  res.json({ status: 200, data: ownUser });
}

/////////////////////////////////////////////////////////////////////////////////////

async function deleteAllMessages(req, res) {
  await Message.deleteMany({});
  res.json({ status: 200, message: "All Messages deleted." });
}

//

module.exports = {
  loginUser,
  createUser,
  storeUserMsg,
  getAllRooms,
  getMe,
  getRecentMessages,
  deleteAllMessages
};
