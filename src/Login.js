import React, { useState } from 'react';
import './Auth.css';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from './i18n';
import api from './services/api';

function Login() {
  const history = useHistory();
  const { t } = useTranslation();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Call demo API
    api.login({ identifier, password }).then(res => {
      if (res && res.token) {
        localStorage.setItem('demo_token', res.token);
          localStorage.setItem('demo_user', JSON.stringify(res.user));
        history.push('/');
      } else {
        alert(res && res.error ? res.error : 'Login failed');
      }
    }).catch(err => alert(err.message || 'Login error'));
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <h2>{t('auth.login')}</h2>
        <form onSubmit={handleSubmit} className="auth__form">
          <label>
            {t('auth.email_or_username')}
            <input type="text" value={identifier} onChange={e => setIdentifier(e.target.value)} required />
          </label>
          <label>
            {t('auth.password')}
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>
          <button type="submit" className="auth__btn">{t('auth.signin')}</button>
        </form>
        <p>
          {t('auth.new_here')} <Link to="/register">{t('auth.create_account')}</Link>
        </p>
      </div>
    </div>
  )
}

export default Login;
