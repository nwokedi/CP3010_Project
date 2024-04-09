import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import Layout from '../components/Layout';

const TriviaPage = () => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchDailyQuestion = async () => {
      try {
        const response = await axios.get('/api/trivia/daily');
        setQuestion(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDailyQuestion();
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/trivia/answer', {
        questionId: question._id,
        selectedAnswer,
      });
      setIsAnswered(true);
      setScore(response.data.score);
    } catch (error) {
      console.error(error);
    }
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>{question.question}</Card.Title>
              {question.answers.map((answer, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? 'primary' : 'outline-primary'}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isAnswered}
                >
                  {answer}
                </Button>
              ))}
              <Button
                variant="success"
                onClick={handleSubmit}
                disabled={selectedAnswer === null || isAnswered}
              >
                Submit
              </Button>
              {isAnswered && (
                <div className="mt-3">
                  <p>Your score: {score}/10</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </Layout>
  );
};

export default TriviaPage;