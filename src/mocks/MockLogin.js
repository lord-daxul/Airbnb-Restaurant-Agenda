import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function MockLogin() {
  const history = useHistory()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const name = identifier || 'David'
    const user = { name, email: `${name.replace(/\s+/g, '').toLowerCase()}@example.com` }
    localStorage.setItem('demo_token', 'mock-token')
    localStorage.setItem('demo_user', JSON.stringify(user))
    history.push('/mock/profile')
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 32 }}>
      <div style={{ width: 420, border: '1px solid #ddd', borderRadius: 8, padding: 24 }}>
        <h2>Mock Login</h2>
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: 8 }}>Usuario o email</label>
          <input value={identifier} onChange={e => setIdentifier(e.target.value)} style={{ width: '100%', marginBottom: 12 }} />
          <label style={{ display: 'block', marginBottom: 8 }}>Contraseña</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', marginBottom: 12 }} />
          <button type="submit" style={{ width: '100%', padding: 10 }}>Iniciar sesión (mock)</button>
        </form>
      </div>
    </div>
  )
}

export default MockLogin
