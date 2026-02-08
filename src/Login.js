import React, { useState } from 'react';
import './Auth.css';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from './i18n';

function Login() {
  const history = useHistory();
  const { t } = useTranslation();
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
        <h2>{t('auth.login')}</h2>
        <form onSubmit={handleSubmit} className="auth__form">
          <label>
            {t('auth.email')}
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
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
