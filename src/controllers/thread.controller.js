const Thread = require("../models/thread.model");
const Session = require("../models/session.model");

// validateSession
async function validateSession(sessionID) {
  if (!sessionID) {
    throw new Error("No session found, please login.");
  }

  const session = await Session.findById(sessionID);
  if (!session) {
    throw new Error("Session not valid or expired.");
  }

  return session;
}

// createThread
async function createThread(req, res) {
  try {
    const { title, content } = req.body;
    const sessionID = req.cookies.session_id;

    const session = await validateSession(sessionID);

    const newThread = new Thread({
      title,
      content,
      userId: session.userId,
    });

    const savedThread = await newThread.save();
    res
      .status(201)
      .json({ message: "Thread created successfully", thread: savedThread });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Thread tidak berhasil dibuat, coba lagi" });
  }
}

// getAllThreads
async function getAllThreads(req, res) {
  const threads = await Thread.find().populate("userId");

  res.status(200).json({ data: threads });
}

module.exports = {
  createThread,
  getAllThreads,
  validateSession,
};
