import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
}

export default LoginForm;