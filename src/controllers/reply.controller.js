require("dotenv").config();
const replyModel = require("../models/reply.model.js");
const sessionModel = require("../models/session.model.js");

// Create a new reply
async function createReply(req, res) {
  const { title, content, threadId } = req.body;

  const sessionID = req.cookies.session_id;

  const session = await sessionModel.findById(sessionID);
  if (!session) {
    res.status(401).json({ message: "Session not found, please login" });
  } else {
    const newReply = new replyModel({
      title,
      content,
      threadId,
    });

    const savedReply = await newReply.save();
    res
      .status(201)
      .json({ message: "Reply created successfully", reply: savedReply });
  }
}

// Get all replies
async function getAllReplies(req, res) {
  const replies = await replyModel.find().populate("threadId");

  res.status(200).json({ data: replies });
}

module.exports = { createReply, getAllReplies };
