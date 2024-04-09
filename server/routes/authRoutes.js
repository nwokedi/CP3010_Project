const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Google OAuth login
router.get('/google/login', async (req, res) => {
  try {
    const { token } = req.query;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email } = ticket.getPayload();
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email });
      await user.save();
    }
    const jwtToken = generateToken(user);
    res.cookie('token', jwtToken, { httpOnly: true });
    res.json({ token: jwtToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

function generateToken(user) {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

module.exports = router;