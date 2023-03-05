const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Message = model("Message", messageSchema);

module.exports = Message;
