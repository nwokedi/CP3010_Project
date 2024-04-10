import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const MainPage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Welcome to the Trivia App</h1>
          <Button variant="primary" href="/trivia">
            Play Trivia
          </Button>
          <Button variant="secondary" href="/leaderboard">
            Leaderboard
          </Button>
          {/* Add other application options here */}
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;