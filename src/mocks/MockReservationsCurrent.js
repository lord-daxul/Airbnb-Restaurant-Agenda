import React from 'react'
import { Link } from 'react-router-dom'

function MockReservationsCurrent() {
  return (
    <div style={{ padding: 40 }}>
      <h2>Reservas actuales</h2>
      <div style={{ marginTop: 20, padding: 18, borderRadius: 8, background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
        No existen reservas actuales.
      </div>
      <p style={{ marginTop: 18 }}>Volver al <Link to="/profile">perfil</Link></p>
    </div>
  )
}

export default MockReservationsCurrent
