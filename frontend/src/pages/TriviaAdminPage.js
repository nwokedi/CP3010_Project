import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const TriviaAdminPage = () => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [date, setDate] = useState('');

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/trivia', {
        question,
        answers,
        correctAnswer,
        date,
      });
      console.log('New trivia question created:', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2>Add a New Trivia Question</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formQuestion">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the trivia question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Form.Group>

            {answers.map((answer, index) => (
              <Form.Group key={index} controlId={`formAnswer${index}`}>
                <Form.Label>Answer {index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter answer ${index + 1}`}
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
              </Form.Group>
            ))}

            <Form.Group controlId="formCorrectAnswer">
              <Form.Label>Correct Answer</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="3"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(parseInt(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TriviaAdminPage;