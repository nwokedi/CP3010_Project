require('dotenv').config()
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');



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

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (!(await user.comparePassword(password))) {
      console.error('Invalid password for user:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true });
    res.json({ token });
  } catch (error) {
    console.error('Error in login route:', error);
    res.status(400).json({ message: error.message });
  }
});


// Google OAuth login
//router.post('/api/auth/google/login', async (req, res) => {
router.post('/google/login', async (req, res) => {
  console.log('Google login request received');
  console.log('access_token:', req.body.accessToken);
  try {
    const { accessToken } = req.body;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    console.log('Verifying Google ID token...');
    const ticket = await client.verifyIdToken({
      idToken: accessToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log('Google ID token verified');
    const { email } = ticket.getPayload();
    console.log('Google login email:', email);
    let user = await User.findOne({ email });
    if (!user) {
      console.log('Creating new user:', email);
      user = new User({ email });
      await user.save();
    }
    const jwtToken = generateToken(user);
    console.log('JWT token generated:', jwtToken);
    res.cookie('token', jwtToken, { httpOnly: true });
    res.json({ token: jwtToken });
  } catch (error) {
    console.error('Error in Google login route:', error);
    res.status(400).json({ message: error.message });
  }
});

function generateToken(user) {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

module.exports = router;