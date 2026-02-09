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
    // Mock login: try to find user in mock_users, otherwise create one
    const ident = (identifier || '').trim()
    const usersKey = 'mock_users'
    try {
      const users = JSON.parse(localStorage.getItem(usersKey) || '[]')
      let user = null
      if (ident) {
        user = users.find(u => u.email === ident.toLowerCase() || (u.name && u.name.toLowerCase() === ident.toLowerCase()))
      }
      if (!user) {
        const nameGuess = ident || 'David'
        user = { name: nameGuess, email: `${nameGuess.replace(/\s+/g, '').toLowerCase()}@example.com` }
        // persist
        users.push(user)
        localStorage.setItem(usersKey, JSON.stringify(users))
      }
      localStorage.setItem('demo_token', 'mock-token')
      localStorage.setItem('demo_user', JSON.stringify(user))
      history.push('/profile')
    } catch (e) {
      // fallback: create a simple demo user
      const name = identifier || 'David'
      const user = { name, email: `${name.replace(/\s+/g, '').toLowerCase()}@example.com` }
      localStorage.setItem('demo_token', 'mock-token')
      localStorage.setItem('demo_user', JSON.stringify(user))
      history.push('/mock/profile')
    }
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
