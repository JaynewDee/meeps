const db = require("../config/db");
const ChatRoom = require("../models/ChatRoom");
const User = require("../models/User");

const superCoolRoom = {
  name: "Super Cool Room",
  members: [],
  messages: []
};

db.once("open", async () => {
  try {
    const { _id } = await ChatRoom.create(superCoolRoom);
    const admin = await User.findOne({ email: "jdiehl2236@gmail.com" });

    await ChatRoom.findOneAndUpdate({ _id }, { $push: { members: admin._id } });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
