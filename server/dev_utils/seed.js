const db = require("../config/db");
const ChatRoom = require("../models/ChatRoom");

db.once("open", async () => {
  try {
    await ChatRoom.create({ name: "central", members: [], messages: [] });
    process.exit(0);
  } catch (err) {
    process.exit(1);
  }
});
