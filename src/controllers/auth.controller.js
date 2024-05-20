require("dotenv").config();
const User = require("../models/user.model");
const Session = require("../models/session.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login menggunakan JWT
async function handleLoginJWT(req, res) {
  const { email, password } = req.body;

  // 1. Cari user berdasarkan email
  const user = await User.findOne({ email });
  if (!user) res.status(404).json({ message: "User not found" });

  // 2. Cek password user
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  // console.log({ isPasswordMatch }); // true or false

  if (!isPasswordMatch) res.status(403).json({ message: "Invalid password" });

  // 3. buat payload/body untuk token
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  // 4. Generate token
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

  // 5. Set token ke cookie user
  res.cookie("token", token).json({ message: "Login success", user: payload });
}

// Login menggunakan session
async function handleLoginSession(req, res) {
  const { email, password } = req.body;

  // 1. Cari user berdasarkan email
  const user = await User.findOne({ email });
  if (!user) res.status(404).json({ message: "User not found" });

  // 2. Cek password user
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  // console.log({ isPasswordMatch }); // true or false

  if (!isPasswordMatch) res.status(403).json({ message: "Invalid password" });

  // 3. Insert session ID ke database
  const newSession = new Session({ userId: user.id });

  const session = await newSession.save();
  // console.log(session); cek session

  // 4. Set session ID ke cookie user
  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  res
    .cookie("sessionId", session.id)
    .json({ message: "Login success", user: userData });
}

// Register user
async function handleRegister(req, res) {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  const user = await newUser.save();

  res.status(201).json({ message: "User registered successfully", data: user });

  // console.log({ password, hashedPassword });  cek password
}

// Logout user
async function handleLogout(req, res) {
  // delete session ID dari database
  const sessionId = req.cookies?.sessionId;

  await Session.findByIdAndDelete(sessionId);

  return res.send("Logout success");
}

module.exports = {
  handleLoginJWT,
  handleLoginSession,
  handleRegister,
  handleLogout,
};
