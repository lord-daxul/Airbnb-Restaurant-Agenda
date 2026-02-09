import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function MockProfile() {
  const userStr = localStorage.getItem('demo_user')
  const stored = userStr ? JSON.parse(userStr) : null
  const [user, setUser] = useState(stored)
  const [editing, setEditing] = useState(false)

  if (!user) {
    return (
      <div style={{ padding: 40 }}>
        <h3>No hay usuario en sesión</h3>
        <p>Ir a <Link to="/mock/login">login mock</Link></p>
      </div>
    )
  }

  const initial = (user.name && user.name[0]) ? user.name[0].toUpperCase() : 'U'

  function openEdit() {
    setEditing(true)
  }

  function saveDetails(details) {
    const updated = Object.assign({}, user, details, { role: 'Usuario' })
    localStorage.setItem('demo_user', JSON.stringify(updated))
    setUser(updated)
    setEditing(false)
    // also persist into mock_users list
    try {
      const key = 'mock_users'
      const existing = JSON.parse(localStorage.getItem(key) || '[]')
      const email = (updated.email || '').toLowerCase()
      const idx = existing.findIndex(u => (u.email || '').toLowerCase() === email)
      if (idx >= 0) existing[idx] = Object.assign({}, existing[idx], updated)
      else existing.push(updated)
      localStorage.setItem(key, JSON.stringify(existing))
    } catch (e) {
      console.warn('failed saving to mock_users', e)
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '80vh' }}>
      <aside style={{ width: 260, borderRight: '1px solid #eee', padding: 24 }}>
        <h2 style={{ marginTop: 0 }}>Perfil</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ padding: '12px 0', background: '#f6f6f6', borderRadius: 12, display: 'flex', alignItems: 'center' }}>
            <div style={{ width:36, height:36, borderRadius:18, background:'#222', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 12px' }}>{initial}</div>
            Información sobre mí
          </li>
          <li style={{ padding: '10px 0', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: 10 }}>📅</span>
            <Link to="/mock/reservas-actuales">reservas actuales</Link>
          </li>
          <li style={{ padding: '10px 0', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: 10 }}>🧾</span>
            <Link to="/mock/reservas-anteriores">Reservas anteriores</Link>
          </li>
        </ul>
      </aside>
      <main style={{ flex: 1, padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Información sobre mí</h1>
          <button onClick={openEdit} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#fff' }}>Editar</button>
        </div>

        <div style={{ maxWidth: 700, marginTop: 18 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <div style={{ width: 120, height: 120, borderRadius: '50%', background: '#222', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>{initial}</div>
              <h2 style={{ margin: '18px 0 4px' }}>{user.name}</h2>
              <div style={{ color: '#666' }}>{user.role || 'Usuario'}</div>
            </div>
          </div>

          <div style={{ marginTop: 24, color: '#666', paddingTop: 20, borderTop: '1px solid #eee' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 18 }}>💬</span>
              <div>Reseñas escritas por mí</div>
            </div>
          </div>
        </div>

        {editing && (
          <EditForm user={user} onSave={saveDetails} onCancel={() => setEditing(false)} />
        )}
      </main>
    </div>
  )
}

function EditForm({ user, onSave, onCancel }) {
  const [name, setName] = useState(user.name || '')
  const [lastname, setLastname] = useState(user.lastname || '')
  const [dob, setDob] = useState(user.dob || '')
  const [phone, setPhone] = useState(user.phone || '')

  function handleSubmit(e) {
    e.preventDefault()
    onSave({ name: name.trim() || user.name, lastname: lastname.trim(), dob, phone })
  }

  return (
    <div style={{ position: 'fixed', top: 60, left: '50%', transform: 'translateX(-50%)', width: 720, background: '#fff', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', padding: 24, borderRadius: 8, zIndex: 40 }}>
      <h3 style={{ marginTop: 0 }}>Completa tu perfil</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label>Nombre</label>
            <input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: 8 }} required />
          </div>
          <div>
            <label>Apellido</label>
            <input value={lastname} onChange={e => setLastname(e.target.value)} style={{ width: '100%', padding: 8 }} required />
          </div>
          <div>
            <label>Fecha de nacimiento</label>
            <input type="date" value={dob} onChange={e => setDob(e.target.value)} style={{ width: '100%', padding: 8 }} required />
          </div>
          <div>
            <label>Teléfono</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: 8 }} required />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <button type="submit" style={{ background: '#ff385c', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: 6 }}>Guardar</button>
          <button type="button" onClick={onCancel} style={{ padding: '8px 14px', borderRadius: 6 }}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}

export default MockProfile
