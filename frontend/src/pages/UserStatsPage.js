import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const UserStatsPage = () => {
  const [userStats, setUserStats] = useState({
    gamesPlayed: 0,
    averageScore: 0,
    perfectScores: 0,
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await axios.get('/api/user-stats');
        setUserStats(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserStats();
  }, []);

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Your Trivia Stats</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>Games Played: {userStats.gamesPlayed}</ListGroup.Item>
                <ListGroup.Item>Average Score: {userStats.averageScore}</ListGroup.Item>
                <ListGroup.Item>Perfect Scores: {userStats.perfectScores}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserStatsPage;