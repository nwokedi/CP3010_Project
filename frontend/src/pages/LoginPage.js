import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const LoginPage = ({ handleGoogleLogin, handleEmailPasswordLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

/*  
  const onGoogleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      await handleGoogleLogin(credentialResponse.access_token);
    },
    onError: (error) => {
      console.error('Google login error:', error);
    },
  });
*/
const onGoogleLogin = useGoogleLogin({
  onSuccess: async (credentialResponse) => {
    console.log('Google login success:', credentialResponse);
    await handleGoogleLogin(credentialResponse.access_token);
    navigate('/main');
  },
  onError: (error) => {
    console.error('Google login error:', error);
  },
});


  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleEmailPasswordLogin(email, password);
    navigate('/main');
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2>Login</h2>
          <Form onSubmit={handleSubmit}>
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
            <Button variant="outline-primary" onClick={onGoogleLogin}>
              Login with Google
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;