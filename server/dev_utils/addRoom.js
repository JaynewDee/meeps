const db = require("../config/db");
const ChatRoom = require("../models/ChatRoom");

const superCoolRoom = {
  name: "Super Cool Room",
  members: [],
  messages: []
};

db.once("open", async () => {
  try {
    const { _id } = await ChatRoom.create(superCoolRoom);
    await ChatRoom.findOneAndUpdate({ _id }, { $push: { members } });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
