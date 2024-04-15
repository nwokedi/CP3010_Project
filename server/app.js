require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const triviaRoutes = require('./routes/triviaRoutes');
const userStatsRoutes = require('./routes/userStatsRoutes');


const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB

mongoose.connect('mongodb://localhost/trivia-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trivia', triviaRoutes);
app.use('/api/user-stats', userStatsRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});