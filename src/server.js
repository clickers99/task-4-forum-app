const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const middleware = require("./controllers/middleware.js");

const authRouter = require("./routers/auth.router.js");
const threadRouter = require("./routers/thread.router.js");
const replyRouter = require("./routers/reply.router.js");
const MONGO_DB_URL = require("./config/dburl.config.js");

mongoose.connect(MONGO_DB_URL);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routers
app.use(authRouter);
app.use(threadRouter);
app.use(replyRouter);
app.use("/api", middleware);

// Server
app.listen(8000);
