const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gamesPlayed: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
  perfectScores: { type: Number, default: 0 },
  lastAttemptDate: { type: String, required: true },
});

module.exports = mongoose.model('UserStats', userStatsSchema);