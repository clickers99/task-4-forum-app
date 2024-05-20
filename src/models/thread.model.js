const mongoose = require("mongoose");
const { Schema } = mongoose;

const threadSchema = new Schema({
  title: String,
  content: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;
