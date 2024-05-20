const express = require("express");
const replyRouter = express();
const replyController = require("../controllers/reply.controller.js");

replyRouter.get("/api/replies", replyController.getAllReplies);
replyRouter.post("/api/replies", replyController.createReply);

module.exports = replyRouter;
