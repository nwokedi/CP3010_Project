
const mongoose = require('mongoose');

const triviaSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answers: { type: [String], required: true },
  correctAnswer: { type: Number, required: true },
  date: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Trivia', triviaSchema);
