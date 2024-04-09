import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Layout from '../components/Layout';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/trivia');
    } catch (error) {
      console.error(error);
    }
  };

  const handleOAuthLogin = async (provider) => {
    try {
      const response = await axios.get(`/api/auth/${provider}/login`);
      localStorage.setItem('token', response.data.token);
      navigate('/trivia');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2>Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <div className="mt-3">
            <p>Or login with:</p>
            <Button variant="secondary" onClick={() => handleOAuthLogin('google')}>
              Google
            </Button>
            <Button variant="secondary" onClick={() => handleOAuthLogin('facebook')}>
              Facebook
            </Button>
          </div>
          <p className="mt-3">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </Col>
      </Row>
    </Container>
    </Layout>
  );
};

export default LoginPage;