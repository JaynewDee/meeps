const db = require("../config/db");
const ChatRoom = require("../models/ChatRoom");
const User = require("../models/User");

const central = {
  name: "central",
  members: [],
  messages: []
};

const admin = (centralId) => ({
  firstName: "Joshua",
  lastName: "Diehl",
  username: "synthetic_rain",
  email: "jdiehl2236@gmail.com",
  password: "Password123!",
  rooms: [centralId],
  messages: []
});

db.once("open", async () => {
  try {
    await db.dropDatabase();

    const {
      _id
    } = await ChatRoom.create(central);

    await User.create(admin(_id));

    process.exit(0);
  } catch (err) {

    console.error(err);

    process.exit(1);
  }
});