const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const triviaRoutes = require('./routes/triviaRoutes');
const userStatsRoutes = require('./routes/userStatsRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/trivia-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trivia', triviaRoutes);
app.use('/api/user-stats', userStatsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});