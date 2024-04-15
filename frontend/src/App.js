import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import axios from 'axios';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleGoogleLogin = async (accessToken) => {
    try {
      console.log('Handling Google login...');
      const response = await axios.post('/api/auth/google/login', { accessToken });
      console.log('Google login response:', response.data);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error in Google login:', error);
      console.log('Response details:', error.response);
      console.error('Error logging in with Google:', error);
    }
  };

  const handleEmailPasswordLogin = async (email, password) => {
    try {
      console.log('Handling email/password login...');
      const response = await axios.post('/api/auth/login', { email, password });
      console.log('Email/password login response:', response.data);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error logging in with email/password:', error);
    }
  };

  return (
    <Router>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage
                handleGoogleLogin={handleGoogleLogin}
                handleEmailPasswordLogin={handleEmailPasswordLogin}
              />
            }
          />
          <Route
            path="/main"
            element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </GoogleOAuthProvider>
    </Router>
  );
};
export default App;