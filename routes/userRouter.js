const express = require("express");
const { UserModel } = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const {email, password } = req.body;
  try {
 const pass = await bcrypt.hash(password, 5);
    const newUser = new UserModel({
      email: email,
      password: pass,
    });
    await newUser.save();
    res.status(201).json({"msg":"signup successful"});
  } catch (err) {
    res.status(500).json({"msg":"something gone wronge"});
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await UserModel.findOne({ email });
    if (!newUser) {
      return res.status(401).json({"msg":"something went wrong !"});
    }

    const pass = await bcrypt.compare(password, newUser.password);
    if (!pass) {
      return res.status(401);
    }
    const token = jwt.sign({ userId: newUser._id }, "masai");
    res.send({ token: `${token}` });
  } catch (err) {
  res.json({"error":"can't login"})
  }
});

module.exports = {
  userRouter,
};

