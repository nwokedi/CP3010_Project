import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const QuestionPage = () => {
  const [question, setQuestion] = useState({});
  const navigate = useNavigate();

  const sampleQuestions = [
    { id: 1, text: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], correct: "Paris" },
    { id: 2, text: "Who painted the Mona Lisa?", options: ["Vincent Van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"], correct: "Leonardo da Vinci" },
    { id: 3, text: "What is the largest planet in our solar system?", options: ["Earth", "Saturn", "Jupiter", "Mars"], correct: "Jupiter" },
  ];

  useEffect(() => {
    const lastAttemptTime = localStorage.getItem('lastAttemptTime');
    const currentTime = new Date().getTime();

    if (lastAttemptTime && currentTime - lastAttemptTime < 86400000) {
      alert("You've already played today. Come back tomorrow!");
      navigate('/stats'); // Redirect to stats if they've already played today
    } else {
      // Randomly select a question
      const randomIndex = Math.floor(Math.random() * sampleQuestions.length);
      setQuestion(sampleQuestions[randomIndex]);
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedOption = event.target.questionOptions.value;
    const isCorrect = selectedOption === question.correct;

    // Update last attempt time and stats in localStorage
    localStorage.setItem('lastAttemptTime', new Date().getTime().toString());
    let stats = JSON.parse(localStorage.getItem('userStats')) || { timesPlayed: 0, totalScore: 0, perfectScores: 0 };
    
    stats.timesPlayed += 1;
    stats.totalScore += isCorrect ? 1 : 0; 
    if (isCorrect) {
      stats.perfectScores += 1;
    }

    localStorage.setItem('userStats', JSON.stringify(stats));

    navigate('/stats');
  };

  return (
    <Container className="mt-5">
      <h2>Daily Question</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>{question.text}</Form.Label>
          {question.options && question.options.map((option, index) => (
            <Form.Check
              key={index}
              type="radio"
              label={option}
              name="questionOptions"
              value={option}
              required
            />
          ))}
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default QuestionPage;
