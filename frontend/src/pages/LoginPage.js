/*
import React, { useState } from 'react';
//import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import Layout from '../components/Layout';


/*const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/main'); //navigate('/trivia');
    } catch (error) {
      console.error(error);
    }
  }; */
/*
  const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (e) => {
      e.preventDefault();
      // Existing email/password login logic
      try {
        const response = await axios.post('/api/auth/login', { email, password });
        localStorage.setItem('token', response.data.token);
        navigate('/main');
      } catch (error) {
        console.error(error);
      }
    };

  const handleGoogleLogin = async (response) => {
    try {
      const { tokenId } = response;
      const res = await axios.post('/api/auth/google/login', { token: tokenId });
      localStorage.setItem('token', res.data.token);
      navigate('/main');//navigate('/trivia');
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
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              onSuccess={handleGoogleLogin}
              onFailure={(error) => console.error(error)}
              cookiePolicy={'single_host_origin'}
            />
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
*/

/*
import { useGoogleOneTapLogin } from '@react-oauth/google';

const LoginPage = ({ onGoogleLogin }) => {
   useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      await onGoogleLogin(credentialResponse.credential);
    },
    onError: (error) => {
      console.error('Google login error:', error);
    },
  });

  return (
    <div>
       
       /*
       /<button onClick={onGoogleLogin}>Login with Google</button>
    
    </div>
  );
};

export default LoginPage;
*/
import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const LoginPage = ({ handleGoogleLogin, handleEmailPasswordLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onGoogleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      await handleGoogleLogin(credentialResponse.access_token);
    },
    onError: (error) => {
      console.error('Google login error:', error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleEmailPasswordLogin(email, password);
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