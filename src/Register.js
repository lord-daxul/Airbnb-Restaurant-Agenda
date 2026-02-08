import React, { useState } from 'react';
import './Auth.css';
import { Link, useHistory } from 'react-router-dom';

function Register() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Mock register - no backend
    alert(`Mock register for ${name} <${email}>`);
    history.push('/login');
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="auth__form">
          <label>
            Name
            <input value={name} onChange={e => setName(e.target.value)} required />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>
          <button type="submit" className="auth__btn">Create account</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register;
