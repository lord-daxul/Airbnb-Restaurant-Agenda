import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useRouteMatch, useHistory } from 'react-router-dom'
import { users as repoUsers, restaurants as repoRestaurants, bookings as repoBookings } from '../data/repoData'
import bootstrapRepoToLocalStorage from '../data/bootstrapRepoToLocalStorage'

function ConfirmDialog({ open, title, message, onCancel, onConfirm }) {
  if (!open) return null
  return (
    <div style={{ position: 'fixed', left: 0, top: 0, right:0, bottom:0, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.3)', zIndex:9999 }}>
      <div style={{ background:'#fff', padding:20, borderRadius:6, width:380, boxShadow:'0 6px 20px rgba(0,0,0,0.2)' }}>
        <h4 style={{ marginTop:0 }}>{title || 'Confirmar'}</h4>
        <div style={{ marginBottom:12 }}>{message}</div>
        <div style={{ textAlign:'right' }}>
          <button onClick={onCancel} style={{ marginRight:8 }}>Cancelar</button>
          <button onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  )
}

function UsersTab() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    bootstrapRepoToLocalStorage()
    try {
      const raw = localStorage.getItem('mock_users')
      const parsed = raw ? JSON.parse(raw) : (Array.isArray(repoUsers) ? repoUsers : [])
      setUsers(parsed)
    } catch (e) { setUsers(Array.isArray(repoUsers) ? repoUsers : []) }
  }, [])

  function exportUsers() {
    try {
      const data = JSON.stringify(users || [], null, 2)
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'mock_users.json'
      a.click()
      URL.revokeObjectURL(url)
    } catch (e) { alert('Error al exportar usuarios') }
  }

  function onImportFile(e) {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        if (Array.isArray(parsed)) {
          localStorage.setItem('mock_users', JSON.stringify(parsed))
          setUsers(parsed)
          alert('Usuarios importados correctamente')
        } else alert('Formato inválido: se esperaba un array de usuarios')
      } catch (err) { alert('Error al leer archivo JSON') }
    }
    reader.readAsText(f)
    e.target.value = ''
  }

  function onResetFromRepo() {
    try {
      bootstrapRepoToLocalStorage({ force: true })
      alert('Datos restablecidos desde repo. La página se recargará.')
      window.location.reload()
    } catch (err) { alert('Error al restablecer desde repo') }
  }

  return (
    <div className="panel-card">
      <h3>Usuarios</h3>
      <div style={{ marginBottom: 12 }}>
        <button onClick={exportUsers} style={{ marginRight: 8 }}>Exportar JSON</button>
        <label style={{ cursor: 'pointer' }}>
          <input type="file" accept="application/json" onChange={onImportFile} style={{ display: 'none' }} />
          <button>Importar JSON</button>
        </label>
        <button onClick={onResetFromRepo} style={{ marginLeft: 12 }}>Restablecer desde repo</button>
      </div>
      {users.length === 0 && <div>No hay usuarios registrados.</div>}
      {users.length > 0 && (
        <table className="simple-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Municipio</th>
              <th>RestaurantId</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.lastname || '-'}</td>
                <td>{u.username || '-'}</td>
                <td>{u.email || '-'}</td>
                <td>{u.phone || '-'}</td>
                <td>{u.state || '-'}</td>
                <td>{u.municipality || '-'}</td>
                <td>{u.restaurantId || '-'}</td>
                <td>{u.role || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

function RestaurantsTab({ match }) {
  const [items, setItems] = useState([])
  useEffect(() => {
    try {
      const raw = localStorage.getItem('mock_restaurants')
      const parsed = raw ? JSON.parse(raw) : (Array.isArray(repoRestaurants) ? repoRestaurants : [])
      setItems(parsed)
    } catch (e) { setItems(Array.isArray(repoRestaurants) ? repoRestaurants : []) }
  }, [])

  return (
    <div className="panel-card">
      <h3>Restaurantes</h3>
      <table className="simple-table">
        <thead><tr><th>Id</th><th>Nombre</th><th>Categoría</th><th>Ciudad</th><th>Acciones</th></tr></thead>
        <tbody>
          {items.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>{r.category}</td>
              <td>{r.address?.city || '-'}</td>
              <td>
                <Link to={`${match.url}/restaurants/edit/${r.id}`}><button>Edit</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ReservationsTab() {
  const [items, setItems] = useState([])
  const [users, setUsers] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [confirm, setConfirm] = useState({ open: false, id: null, message: '' })
  const match = useRouteMatch()

  useEffect(() => {
    try {
      const rawB = localStorage.getItem('mock_bookings')
      const parsedB = rawB ? JSON.parse(rawB) : (Array.isArray(repoBookings) ? repoBookings : [])
      setItems(parsedB)

      const rawU = localStorage.getItem('mock_users')
      const parsedU = rawU ? JSON.parse(rawU) : (Array.isArray(repoUsers) ? repoUsers : [])
      setUsers(parsedU)

      const rawR = localStorage.getItem('mock_restaurants')
      const parsedR = rawR ? JSON.parse(rawR) : (Array.isArray(repoRestaurants) ? repoRestaurants : [])
      setRestaurants(parsedR)
    } catch (e) {
      setItems(Array.isArray(repoBookings) ? repoBookings : [])
      setUsers(Array.isArray(repoUsers) ? repoUsers : [])
      setRestaurants(Array.isArray(repoRestaurants) ? repoRestaurants : [])
    }
  }, [])

  function findUser(id) { return users.find(u => Number(u.id) === Number(id)) }
  function findRestaurant(id) { return restaurants.find(r => Number(r.id) === Number(id)) }

  if (!items || items.length === 0) return (
    <div className="panel-card">
      <h3>Reservas</h3>
      <div>No hay reservas registradas.</div>
    </div>
  )

  function requestDelete(id) {
    setConfirm({ open: true, id, message: `Eliminar reserva #${id}?` })
  }

  function handleCancelConfirm() { setConfirm({ open: false, id: null, message: '' }) }

  function handleConfirmDelete() {
    const id = confirm.id
    try {
      const raw = localStorage.getItem('mock_bookings')
      const items = raw ? JSON.parse(raw) : (Array.isArray(repoBookings) ? repoBookings.slice() : [])
      const filtered = items.filter(x => Number(x.id) !== Number(id))
      localStorage.setItem('mock_bookings', JSON.stringify(filtered))
      setItems(filtered)
      setConfirm({ open: false, id: null, message: '' })
      alert('Reserva eliminada')
    } catch (e) { alert('Error al eliminar') }
  }

  return (
    <div className="panel-card">
      <h3>Reservas</h3>
      <table className="simple-table">
        <thead><tr><th>Id</th><th>Usuario</th><th>Restaurante</th><th>Mesa</th><th>Inicio</th><th>Fin</th><th>Asientos</th><th>Total</th><th>Estado</th></tr></thead>
        <tbody>
            {items.map(b => {
            const u = findUser(b.userId)
            const r = findRestaurant(b.restaurantId)
            return (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{u ? `${u.name} ${u.lastname || ''}` : `#${b.userId}`}<div style={{fontSize:12,color:'#666'}}>{u?.email}</div></td>
                <td>{r ? <Link to={`/restaurant/${r.id}`}>{r.name}</Link> : `#${b.restaurantId}`}</td>
                <td>{b.tableId}</td>
                <td>{new Date(b.start).toLocaleString()}</td>
                <td>{new Date(b.end).toLocaleString()}</td>
                <td>{b.seatsBooked}</td>
                <td>
                  {b.pricePerSeat ? (`$${b.pricePerSeat} / persona`) : ''}
                  {b.pricePerSeat ? ' · ' : ''}
                  {b.total ? b.total : `$${Number(b.pricePerSeat || 0) * Number(b.seatsBooked || 0)}`}
                </td>
                <td>{b.status}</td>
                <td>
                  <Link to={`${match.url}/edit/${b.id}`}><button style={{marginRight:8}}>Edit</button></Link>
                  <button onClick={() => requestDelete(b.id)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <ConfirmDialog open={confirm.open} title="Confirmar eliminación" message={confirm.message} onCancel={handleCancelConfirm} onConfirm={handleConfirmDelete} />
    </div>
  )
}

function EditBooking({ match, history }) {
  const id = Number(match.params.id)
  const [form, setForm] = useState(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('mock_bookings')
      const items = raw ? JSON.parse(raw) : (Array.isArray(repoBookings) ? repoBookings : [])
      const b = items.find(x => Number(x.id) === id)
      setForm(b ? { ...b } : null)
    } catch (e) { setForm(null) }
  }, [id])

  if (!form) return <div style={{ padding: 20 }}>Reserva no encontrada.</div>

  function onChange(e) { setForm({ ...form, [e.target.name]: e.target.value }) }

  function save() {
    try {
      // basic validation
      if (isNaN(Date.parse(form.start))) return alert('Fecha de inicio inválida (ISO)')
      if (isNaN(Date.parse(form.end))) return alert('Fecha de fin inválida (ISO)')
      const seats = Number(form.seatsBooked)
      const pps = Number(form.pricePerSeat)
      const tot = Number(form.total)
      if (!Number.isFinite(seats) || seats <= 0) return alert('Asientos inválidos')
      if (!Number.isFinite(pps) || pps < 0) return alert('Precio por asiento inválido')
      if (!Number.isFinite(tot) || tot < 0) return alert('Total inválido')

      const raw = localStorage.getItem('mock_bookings')
      const items = raw ? JSON.parse(raw) : (Array.isArray(repoBookings) ? repoBookings.slice() : [])
      const idx = items.findIndex(x => Number(x.id) === id)
      const updated = { ...form, seatsBooked: seats, pricePerSeat: pps, total: tot }
      if (idx >= 0) items[idx] = updated
      else items.push(updated)
      localStorage.setItem('mock_bookings', JSON.stringify(items))
      alert('Reserva guardada')
      history.push('/panel/superadmin/reservas')
    } catch (e) { alert('Error al guardar') }
  }

  return (
    <div style={{ padding: 20 }}>
      <h3>Editar Reserva #{form.id}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label>Inicio (ISO)</label>
          <input name="start" value={form.start || ''} onChange={onChange} />
        </div>
        <div>
          <label>Fin (ISO)</label>
          <input name="end" value={form.end || ''} onChange={onChange} />
        </div>
        <div>
          <label>Asientos</label>
          <input name="seatsBooked" value={form.seatsBooked || ''} onChange={onChange} />
        </div>
        <div>
          <label>Precio por asiento o silla no se aun que palabra</label>
          <input name="pricePerSeat" value={form.pricePerSeat || ''} onChange={onChange} />
        </div>
        <div>
          <label>Total</label>
          <input name="total" value={form.total || ''} onChange={onChange} />
        </div>
        <div>
          <label>Estado</label>
          <input name="status" value={form.status || ''} onChange={onChange} />
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <button onClick={save} style={{ marginRight: 8 }}>Guardar</button>
        <button onClick={() => history.push('/panel/superadmin/reservas')}>Cancelar</button>
      </div>
    </div>
  )
}

function PaymentsTab() {
  return (
    <div className="panel-card">
      <h3>Pagos</h3>
      <div>No se encontraron pagos.</div>
    </div>
  )
}

function EditRestaurant({ match, history }) {
  const { params } = match
  const id = Number(params.id)
  const [form, setForm] = useState(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('mock_restaurants')
      const items = raw ? JSON.parse(raw) : (Array.isArray(repoRestaurants) ? repoRestaurants : [])
      const r = items.find(x => Number(x.id) === id) || (Array.isArray(repoRestaurants) ? repoRestaurants.find(x => Number(x.id) === id) : null)
      setForm(r ? { ...r } : null)
    } catch (e) { setForm(null) }
  }, [id])

  if (!form) return <div style={{ padding: 20 }}>Restaurante no encontrado.</div>

  function onChange(e) { setForm({ ...form, [e.target.name]: e.target.value }) }

  function save() {
    try {
      const raw = localStorage.getItem('mock_restaurants')
      const items = raw ? JSON.parse(raw) : (Array.isArray(repoRestaurants) ? repoRestaurants.slice() : [])
      const idx = items.findIndex(x => Number(x.id) === id)
      if (idx >= 0) items[idx] = form
      else items.push(form)
      localStorage.setItem('mock_restaurants', JSON.stringify(items))
      alert('Guardado (simulado)')
      history.push('/panel/superadmin')
    } catch (e) { alert('Error al guardar') }
  }

  return (
    <div style={{ padding: 20 }}>
      <h3>Editar Restaurante {form.name}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label>Nombre</label>
          <input name="name" value={form.name || ''} onChange={onChange} />
        </div>
        <div>
          <label>Categoría</label>
          <input name="category" value={form.category || ''} onChange={onChange} />
        </div>
        <div>
          <label>Ciudad</label>
          <input name="city" value={form.address?.city || ''} onChange={e => setForm({ ...form, address: { ...(form.address||{}), city: e.target.value }})} />
        </div>
        <div>
          <label>Estado</label>
          <input name="state" value={form.address?.state || ''} onChange={e => setForm({ ...form, address: { ...(form.address||{}), state: e.target.value }})} />
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <button onClick={save} style={{ marginRight: 8 }}>Guardar</button>
        <button onClick={() => history.push('/panel/superadmin')}>Cancelar</button>
      </div>
    </div>
  )
}

export default function SuperAdminPanel() {
  const match = useRouteMatch()
  const history = useHistory()
  const base = match.url
  const [tab, setTab] = useState('users')

  useEffect(() => {
    // update internal tab when route changes
    const path = history.location.pathname
    if (path.includes('/restaurants')) setTab('restaurants')
    else if (path.includes('/reservas')) setTab('reservas')
    else if (path.includes('/pagos')) setTab('pagos')
    else setTab('users')
  }, [history.location.pathname])

  return (
    <div className="panel-root">
      <h2>SuperAdmin</h2>
      <div className="panel-tabs">
        <Link to={`${base}`}><button className={tab==='users'? 'active':''}>Usuarios</button></Link>
        <Link to={`${base}/restaurants`}><button className={tab==='restaurants'? 'active':''}>Restaurantes</button></Link>
        <Link to={`${base}/reservas`}><button className={tab==='reservas'? 'active':''}>Reservas</button></Link>
        <Link to={`${base}/pagos`}><button className={tab==='pagos'? 'active':''}>Pagos</button></Link>
      </div>

      <div className="panel-body">
        <Switch>
          <Route exact path={`${base}/`} component={UsersTab} />
          <Route exact path={`${base}/restaurants`} render={(props) => <RestaurantsTab match={match} {...props} />} />
          <Route exact path={`${base}/reservas`} component={ReservationsTab} />
          <Route path={`${base}/reservas/edit/:id`} component={EditBooking} />
          <Route exact path={`${base}/pagos`} component={PaymentsTab} />
          <Route path={`${base}/restaurants/edit/:id`} component={EditRestaurant} />
        </Switch>
      </div>
    </div>
  )
}
