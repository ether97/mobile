import express from "express";
import User from "../models/User.js";
import { hash } from "bcrypt";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User does not exist!");
  }

  if (user && bcrypt.compare(password, user.password)) {
    const token = generateToken(user.id);
    return res.status(200).json({
      _id: user.id,
      token: token,
    });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  console.log(name, email, password);

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields must be filled.");
  }

  console.log(name, email, password);

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("User already exists!");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User not created.");
  }
});

export default router;
