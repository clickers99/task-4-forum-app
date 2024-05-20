const Session = require("../models/session.model.js");

async function middleware(req, res, next) {
  // Session ID dari cookie
  const sessionId = req.cookies?.session_id;

  if (!sessionId) {
    return res.send(
      "Kamu tidak punya akses karena session tidak ditemukan, silakan login terlebih dahulu"
    );
  }

  const session = await Session.findOne({ _id: sessionId });

  if (!session) {
    return res.send(
      "Kamu tidak punya akses karena session tidak ditemukan, silakan login terlebih dahulu"
    );
  }

  next();
}

module.exports = middleware;
