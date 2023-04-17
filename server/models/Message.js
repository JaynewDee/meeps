const { Schema, model } = require("mongoose");
const ChatRoom = require("./ChatRoom");

const messageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "ChatRoom",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

messageSchema.post("remove", async doc => {
  const msgId = doc._id;
  await ChatRoom.findOneAndUpdate(
    { name: "central" },
    { $pull: { messages: msgId } }
  );
});

const Message = model("Message", messageSchema);

module.exports = Message;
