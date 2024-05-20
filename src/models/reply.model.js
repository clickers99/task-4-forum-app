const mongoose = require("mongoose");
const { Schema } = mongoose;

const replySchema = new Schema({
  title: String,
  content: String,
  threadId: {
    type: Schema.Types.ObjectId,
    ref: "Thread",
    required: true,
  },
});

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
