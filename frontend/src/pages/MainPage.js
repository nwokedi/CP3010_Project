import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const MainPage = () => {
  const navigate = useNavigate();

  const handlePlayTrivia = () => {
    navigate('/trivia');
  };

  const handleLeaderboard = () => {
    navigate('/leaderboard');
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Welcome to the Trivia App</h1>
          <Button variant="primary" onClick={handlePlayTrivia}>
            Play Trivia
          </Button>
          <Button variant="secondary" onClick={handleLeaderboard}>
            Leaderboard
          </Button>
          {/* Add other application options here */}
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;