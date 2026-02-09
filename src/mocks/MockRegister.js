import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function MockRegister() {
  const history = useHistory()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const user = { name: name || 'David', email: email || `${(name || 'david').replace(/\s+/g, '').toLowerCase()}@example.com` }
    localStorage.setItem('demo_token', 'mock-token')
    localStorage.setItem('demo_user', JSON.stringify(user))
    history.push('/mock/profile')
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 32 }}>
      <div style={{ width: 480, border: '1px solid #ddd', borderRadius: 8, padding: 24 }}>
        <h2>Mock Register</h2>
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: 8 }}>Nombre</label>
          <input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', marginBottom: 12 }} />
          <label style={{ display: 'block', marginBottom: 8 }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', marginBottom: 12 }} />
          <label style={{ display: 'block', marginBottom: 8 }}>Contraseña</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', marginBottom: 12 }} />
          <button type="submit" style={{ width: '100%', padding: 10 }}>Registrarse (mock)</button>
        </form>
      </div>
    </div>
  )
}

export default MockRegister
