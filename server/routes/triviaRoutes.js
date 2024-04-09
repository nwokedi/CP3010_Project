const express = require('express');
const router = express.Router();
const Trivia = require('../models/Trivia');
const UserStats = require('../models/UserStats');
const authMiddleware = require('../middleware/authMiddleware');

// Fetch the daily trivia question
router.get('/daily', authMiddleware, async (req, res) => {
  try {
    const date = new Date().toISOString().slice(0, 10);
    const trivia = await Trivia.findOne({ date });
    if (!trivia) {
      return res.status(404).json({ message: 'No trivia question available for today' });
    }
    res.json(trivia);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Submit an answer for the daily trivia question
router.post('/answer', authMiddleware, async (req, res) => {
  try {
    const { questionId, selectedAnswer } = req.body;
    const trivia = await Trivia.findById(questionId);
    if (!trivia) {
      return res.status(404).json({ message: 'Trivia question not found' });
    }

    const user = req.user;
    const userStats = await UserStats.findOne({ user: user._id });
    if (userStats && userStats.lastAttemptDate === new Date().toISOString().slice(0, 10)) {
      return res.status(400).json({ message: 'You can only attempt the daily trivia once' });
    }

    const score = trivia.answers[selectedAnswer] === trivia.correctAnswer ? 10 : 0;
    const newUserStats = userStats
      ? userStats
      : new UserStats({
          user: user._id,
          gamesPlayed: 1,
          averageScore: score,
          perfectScores: score === 10 ? 1 : 0,
          lastAttemptDate: new Date().toISOString().slice(0, 10),
        });

    newUserStats.gamesPlayed++;
    newUserStats.averageScore =
      (newUserStats.averageScore * (newUserStats.gamesPlayed - 1) + score) / newUserStats.gamesPlayed;
    newUserStats.perfectScores += score === 10 ? 1 : 0;
    newUserStats.lastAttemptDate = new Date().toISOString().slice(0, 10);

    await newUserStats.save();
    res.json({ score });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create a new trivia question
router.post('/', authMiddleware, async (req, res) => {   // chck!!!!!!
  try {
    const { question, answers, correctAnswer, date } = req.body;
    const trivia = new Trivia({ question, answers, correctAnswer, date });
    await trivia.save();
    res.status(201).json(trivia);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;