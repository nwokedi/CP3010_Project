import React from 'react';
import { Container } from 'react-bootstrap';

const StatsPage = () => {
  // Placeholder stats
  const stats = {
    timesPlayed: 10,
    averageScore: 8,
    perfectScores: 2,
  };

  return (
    <Container className="mt-5">
      <h2>Your Statistics</h2>
      <p><strong>Times Played:</strong> {stats.timesPlayed}</p>
      <p><strong>Average Score:</strong> {stats.averageScore}</p>
      <p><strong>Perfect Scores (10/10):</strong> {stats.perfectScores}</p>
    </Container>
  );
};

export default StatsPage;
