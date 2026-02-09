import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from './services/api'
import { tables as repoTables } from './data/repoData'
import './SearchResult.css'
import TableSelector from './TableSelector'

function RestaurantPage() {
  const { id } = useParams()
  const restId = Number(id)
  const [restaurant, setRestaurant] = useState(null)
  const [pricePerPerson, setPricePerPerson] = useState(null)
  const [priceRangeNumeric, setPriceRangeNumeric] = useState(null)
  const partySize = 2
  const [selectedDate, setSelectedDate] = useState('')
  const [guests, setGuests] = useState(2)
  const [selectedTable, setSelectedTable] = useState(null)

  useEffect(() => {
    if (!restId) return
    api.fetchRestaurant(restId).then(r => {
      if (r && r.name) setRestaurant(r)
      else setRestaurant(sampleRestaurant(restId))
    }).catch(() => setRestaurant(sampleRestaurant(restId)))
  }, [restId])

  useEffect(() => {
    if (!restaurant) return
    try {
      const raw = localStorage.getItem('mock_tables')
      const all = raw ? JSON.parse(raw) : (Array.isArray(repoTables) ? repoTables : [])
      const my = (Array.isArray(all) ? all.filter(t => Number(t.restaurantId) === Number(restaurant.id)) : [])
      const prices = []
      my.forEach(t => { if (Array.isArray(t.slots)) t.slots.forEach(s => { if (s && s.pricePerSeat) prices.push(Number(s.pricePerSeat)) }) })
      if (prices.length > 0) {
        const min = Math.min(...prices)
        const max = Math.max(...prices)
        setPriceRangeNumeric(min === max ? { min } : { min, max })
        setPricePerPerson(min)
      } else {
        setPriceRangeNumeric(null)
        setPricePerPerson(null)
      }
    } catch (e) { setPricePerPerson(null) }
  }, [restaurant])

  function handleReserve() {
    // demo behavior: store selection in localStorage bookings
    const booking = { restaurantId: restaurant.id, tableId: selectedTable, date: selectedDate, guests }
    const raw = localStorage.getItem('demo_bookings')
    const arr = raw ? JSON.parse(raw) : []
    arr.push(booking)
    localStorage.setItem('demo_bookings', JSON.stringify(arr))
    alert('Reserva demo guardada en localStorage')
  }

  if (!restaurant) return <div style={{ padding: 32 }}>Cargando ficha...</div>

  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
        <img src={restaurant.cover || restaurant.img || 'https://via.placeholder.com/1000x400'} alt="cover" style={{ width: '100%', height: 400, objectFit: 'cover' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 }}>
        <div>
          <h1 style={{ margin: 0 }}>{restaurant.name}</h1>
          <div style={{ color: '#666' }}>{restaurant.category || 'Restaurante'} · {restaurant.address?.city || ''}</div>
          {restaurant.tags && restaurant.tags.length > 0 && (
            <div style={{ marginTop: 8 }}>
              {restaurant.tags.map(tag => (
                <span key={tag} style={{ display: 'inline-block', marginRight: 8, marginBottom: 6, background: '#f1f1f1', padding: '6px 8px', borderRadius: 16, fontSize: 13 }}>{tag}</span>
              ))}
            </div>
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ background: '#fff3ea', padding: '6px 10px', borderRadius: 8, color: '#ff6600', display: 'inline-block' }}>{restaurant.rating || '—'}</div>
          <div style={{ marginTop: 8 }}>
            <strong>{priceRangeNumeric ? (priceRangeNumeric.min && priceRangeNumeric.max ? (`$${priceRangeNumeric.min}–$${priceRangeNumeric.max} / persona`) : (`$${priceRangeNumeric.min} / persona`)) : (restaurant.pricePerPerson ? (`$${restaurant.pricePerPerson} / persona`) : (restaurant.priceRange || ''))}</strong>
            { (priceRangeNumeric || restaurant.pricePerPerson) && (
              <div style={{ fontSize: 12, color: '#666' }}>${(priceRangeNumeric ? (priceRangeNumeric.min || 0) : restaurant.pricePerPerson) * partySize} total (estimado para {partySize})</div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginTop: 18 }}>
        <div>
          {restaurant.description && (
            <section style={{ marginBottom: 18 }}>
              <h3>Descripción</h3>
              <p style={{ color: '#444' }}>{restaurant.description}</p>
            </section>
          )}

          <section style={{ marginBottom: 18 }}>
            <h3>Horario</h3>
            <p>{restaurant.hours || 'No disponible'}</p>
          </section>

          <section style={{ marginBottom: 18 }}>
            <h3>Reservar</h3>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
              <input type="number" min={1} max={12} value={guests} onChange={e => setGuests(Math.max(1, Math.min(12, Number(e.target.value || 1))))} style={{ width: 80, padding: 8, fontWeight: 700 }} />
              <button onClick={() => { if (!selectedDate) return alert('Selecciona una fecha'); if (!selectedTable) return alert('Selecciona una mesa'); handleReserve() }} style={{ background:'#ff385c', color:'#fff', border:'none', padding:'8px 12px', borderRadius:8 }}>Reservar</button>
            </div>
            <TableSelector tables={restaurant.tables || []} selectedId={selectedTable} onSelect={setSelectedTable} guests={guests} />
          </section>

          <section>
            <h3>Ubicación</h3>
            <p>{(restaurant.address && `${restaurant.address.address}, ${restaurant.address.city}, ${restaurant.address.state}`) || 'No disponible'}</p>
          </section>
        </div>

        <aside style={{ position: 'sticky', top: 24 }}>
          <div style={{ padding: 18, borderRadius: 8, background: '#fff', boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }}>
            <div style={{ marginBottom: 10 }}><strong>{restaurant.rating || '—'}</strong> · Valoración</div>
            <div style={{ marginBottom: 12 }}>
              <strong>{pricePerPerson ? (`$${pricePerPerson} / persona`) : (restaurant.priceRange || '')}</strong>
              {pricePerPerson && <div style={{ fontSize: 12, color: '#666' }}>${pricePerPerson * partySize} total (estimado para {partySize})</div>}
            </div>
            <button style={{ width: '100%', background: '#ff385c', color: '#fff', border: 'none', padding: '10px 12px', borderRadius: 8 }}>Reservar</button>
            <div style={{ marginTop: 12, color: '#666' }}>Botón de reserva demo (no realiza pago)</div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function sampleRestaurant(id) {
  return {
    id,
    name: `Restaurante Demo ${id}`,
    category: 'Restaurante', // one of: Restaurante, Café, Familiar, Evento, Salón
    tags: ['sushi', 'carnes', 'arepera', 'saludable', 'sin gluten', 'organico'].slice(0, 4),
    rating: 4.5,
    priceRange: '$$ · Moderado',
    description: 'Restaurante de prueba. Aquí iría una descripción larga del restaurante, especialidades y ambiente.',
    hours: 'Lun-Dom 10:00 - 22:00',
    address: { address: 'Calle Falsa 123', city: 'San Cristóbal', state: 'Táchira' },
    cover: 'https://images.unsplash.com/photo-1555993539-1732a6c60b77?auto=format&fit=crop&w=1400&q=80'
  }
}

export default RestaurantPage
