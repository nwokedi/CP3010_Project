import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h1>Welcome to the Trivia App</h1>
      <Button variant="primary" onClick={() => navigate('/question')}>Login with OAuth</Button>
      <div className="mt-3">
        Don't have an account? <Button variant="link" onClick={() => navigate('/signup')}>Sign up here</Button>
      </div>
    </Container>
  );
};

export default LoginPage;
