import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import axios from 'axios';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const axiosInstance = axios.create({
    baseURL: '/api',
  });


  useEffect(() => {
    // Check if the user is authenticated (by checking the token in localStorage)
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // console log
console.log('Base URL:', axiosInstance.defaults.baseURL);// Check if the base URL is correct
console.log('Sending POST request to:', '/api/auth/google/login');




  const handleGoogleLogin = async (accessToken) => {
    try {
      const response = await axios.post('/api/auth/google/login', { accessToken });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error in Google login:', error); 
      console.log('Response details:', error.response); // Log details for analysis
      console.error('Error logging in with Google:', error);
    }
  };

  const handleEmailPasswordLogin = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error logging in with email/password:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
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
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;