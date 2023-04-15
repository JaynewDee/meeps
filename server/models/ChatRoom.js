const { Schema, model } = require("mongoose");

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message"
    }
  ]
});

const ChatRoom = model("ChatRoom", roomSchema);

module.exports = ChatRoom;
