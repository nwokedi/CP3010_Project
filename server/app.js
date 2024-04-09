import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TriviaPage from './pages/TriviaPage';
import UserStatsPage from './pages/UserStatsPage';
import TriviaAdminPage from './pages/TriviaAdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/trivia" element={<TriviaPage />} />
        <Route path="/user-stats" element={<UserStatsPage />} />
        <Route path="/admin/trivia" element={<TriviaAdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;