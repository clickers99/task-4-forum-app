const express = require("express");
const threadRouter = express();
const threadController = require("../controllers/thread.controller.js");

threadRouter.post("/api/thread", threadController.createThread);
threadRouter.get("/api/thread", threadController.getAllThreads);

module.exports = threadRouter;
