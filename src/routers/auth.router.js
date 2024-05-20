const express = require("express");
const authRouter = express();
const authController = require("../controllers/auth.controller.js");

authRouter.post("/login", authController.handleLoginSession);

authRouter.get("/logout", authController.handleLogout);

authRouter.post("/register", authController.handleRegister);

module.exports = authRouter;
