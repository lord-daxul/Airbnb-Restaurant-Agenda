import React, { useState } from 'react'
import { useTranslation } from './i18n'

function Profile() {
  useTranslation();
  const userStr = localStorage.getItem('demo_user')
  const stored = userStr ? JSON.parse(userStr) : null
  const [user, setUser] = useState(stored)
  const [editing, setEditing] = useState(false)

  if (!user) {
    return (
      <div style={{ padding: 40 }}>
        <h3>No hay usuario en sesión</h3>
      </div>
    )
  }

  const initial = (user.name && user.name[0]) ? user.name[0].toUpperCase() : 'U'

  function openEdit() {
    setEditing(true)
  }

  function saveDetails(details) {
    const updated = Object.assign({}, user, details)
    localStorage.setItem('demo_user', JSON.stringify(updated))
    setUser(updated)
    setEditing(false)
    // persist into mock_users
    try {
      const key = 'mock_users'
      const existing = JSON.parse(localStorage.getItem(key) || '[]')
      const email = (updated.email || '').toLowerCase()
      const idx = existing.findIndex(u => (u.email || '').toLowerCase() === email)
      if (idx >= 0) existing[idx] = Object.assign({}, existing[idx], updated)
      else existing.push(updated)
      localStorage.setItem(key, JSON.stringify(existing))
    } catch (e) { console.warn(e) }
  }

  return (
    <div className="profile-root">
      <aside className="profile-aside">
        <h2>Perfil</h2>
        <ul className="menu">
          <li className="active">
            <div style={{ width:36, height:36, borderRadius:18, background:'#222', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 12px' }}>{initial}</div>
            Información sobre mí
          </li>
          <li>
            <span role="img" aria-label="Calendario" style={{ marginRight: 10 }}>📅</span>
            <a href="/reservas-actuales">reservas actuales</a>
          </li>
          <li>
            <span role="img" aria-label="Factura" style={{ marginRight: 10 }}>🧾</span>
            <a href="/reservas-anteriores">Reservas anteriores</a>
          </li>
        </ul>
      </aside>
      <main className="profile-main">
        <div className="profile-header">
          <h1>Información sobre mí</h1>
          <button onClick={openEdit} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#fff' }}>Editar</button>
        </div>

        <div className="profile-card">
          <div className="card-inner">
            <div className="profile-avatar">
              <div className="avatar">{initial}</div>
              <h2 style={{ margin: '18px 0 4px' }}>{user.name}{user.lastname ? (' ' + user.lastname) : ''}</h2>
              <div style={{ color: '#666' }}>{user.role || 'Usuario'}</div>
            </div>
          </div>

          <div className="profile-details">
            <h3>Detalles</h3>
            <table className="simple-table" style={{ marginTop: 8 }}>
              <tbody>
                <tr><th>Id</th><td>{user.id || '-'}</td></tr>
                <tr><th>Nombre</th><td>{user.name || '-'}</td></tr>
                <tr><th>Apellido</th><td>{user.lastname || '-'}</td></tr>
                <tr><th>Usuario</th><td>{user.username || '-'}</td></tr>
                <tr><th>Email</th><td>{user.email || '-'}</td></tr>
                <tr><th>Teléfono</th><td>{user.phone || '-'}</td></tr>
                <tr><th>Estado</th><td>{user.state || '-'}</td></tr>
                <tr><th>Municipio</th><td>{user.municipality || '-'}</td></tr>
                <tr><th>RestaurantId</th><td>{user.restaurantId || '-'}</td></tr>
                <tr><th>Rol</th><td>{user.role || '-'}</td></tr>
                {user.dob && <tr><th>Fecha Nac.</th><td>{user.dob}</td></tr>}
              </tbody>
            </table>
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
    <div className="profile-edit-modal">
      <h3 style={{ marginTop: 0 }}>Completa tu perfil</h3>
      <form onSubmit={handleSubmit}>
        <div className="profile-form-grid">
          <div>
            <label>Nombre</label>
            <input value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label>Apellido</label>
            <input value={lastname} onChange={e => setLastname(e.target.value)} required />
          </div>
          <div>
            <label>Fecha de nacimiento</label>
            <input type="date" value={dob} onChange={e => setDob(e.target.value)} required />
          </div>
          <div>
            <label>Teléfono</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} required />
          </div>
        </div>
        <div className="profile-edit-actions">
          <button type="submit" className="btn-primary">Guardar</button>
          <button type="button" onClick={onCancel} className="btn-secondary">Cancelar</button>
        </div>
      </form>
    </div>
  )
}

export default Profile
