import React, { useState } from 'react';
import './Auth.css';
import { Link, useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Mock login - no backend
    alert(`Mock login for ${email}`);
    history.push('/');
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="auth__form">
          <label>
            Email
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>
          <button type="submit" className="auth__btn">Sign in</button>
        </form>
        <p>
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login;
