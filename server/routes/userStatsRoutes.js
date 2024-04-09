const express = require('express');
const router = express.Router();
const UserStats = require('../models/UserStats');
const authMiddleware = require('../middleware/authMiddleware');

// Fetch the user's trivia statistics
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userStats = await UserStats.findOne({ user: req.user._id });
    if (!userStats) {
      return res.json({
        gamesPlayed: 0,
        averageScore: 0,
        perfectScores: 0,
      });
    }
    res.json({
      gamesPlayed: userStats.gamesPlayed,
      averageScore: userStats.averageScore,
      perfectScores: userStats.perfectScores,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;