import React, { useState } from 'react';
import { saveUser } from '../utils/localStorage';

const SignIn = ({ onSignIn }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;
    saveUser(trimmed);
    onSignIn(trimmed);
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2>Sign In</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default SignIn;
