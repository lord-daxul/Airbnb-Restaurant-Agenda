import React, { useState } from 'react';
import './Auth.css';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from './i18n';
import api from './services/api';

function Register() {
  const history = useHistory();
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    api.register({ name, lastname, email, password, phone, state, municipality })
      .then(res => {
        if (res && res.user) {
          alert('Registro simulado OK');
          history.push('/login');
        } else {
          alert(res && res.error ? res.error : 'Register failed');
        }
      }).catch(err => alert(err.message || 'Register error'));
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
