import React, { useState } from 'react';
import './Auth.css';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from './i18n';

function Register() {
  const history = useHistory();
  const { t } = useTranslation();
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
        <h2>{t('auth.register')}</h2>
        <form onSubmit={handleSubmit} className="auth__form">
          <label>
            {t('auth.name')}
            <input value={name} onChange={e => setName(e.target.value)} required />
          </label>
          <label>
            {t('auth.email')}
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label>
            {t('auth.password')}
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>
          <button type="submit" className="auth__btn">{t('auth.create_account')}</button>
        </form>
        <p>
          {t('auth.already_have')} <Link to="/login">{t('auth.signin')}</Link>
        </p>
      </div>
    </div>
  )
}

export default Register;
