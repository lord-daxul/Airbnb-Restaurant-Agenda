import React, { useState } from 'react';
import './Auth.css';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from './i18n';
// api not used in this file

function Register() {
  const history = useHistory();
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Mock register: create user and log in immediately
    const user = { name: name || 'David', lastname: lastname || '', email: email || `${(name || 'david').replace(/\s+/g, '').toLowerCase()}@example.com` }

    // save into mock_users list (prototype JSON store)
    try {
      const key = 'mock_users'
      const existing = JSON.parse(localStorage.getItem(key) || '[]')
      const idx = existing.findIndex(u => u.email === user.email)
      if (idx >= 0) existing[idx] = Object.assign({}, existing[idx], user)
      else existing.push(user)
      localStorage.setItem(key, JSON.stringify(existing))
    } catch (e) {
      console.warn('mock user store failed', e)
    }

    localStorage.setItem('demo_token', 'mock-token')
    localStorage.setItem('demo_user', JSON.stringify(user))
    history.push('/profile')
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
            {t('auth.lastname') || 'Apellido'}
            <input value={lastname} onChange={e => setLastname(e.target.value)} />
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
