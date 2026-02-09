import React, { useEffect, useState } from 'react'
import TableSelector from './TableSelector'

export default function BusinessDetail({ business, tables = [] }) {
  const [coverUrl, setCoverUrl] = useState(null)
  const [pricePerPerson, setPricePerPerson] = useState(null)
  const [priceRangeNumeric, setPriceRangeNumeric] = useState(null)
  const partySize = 2
  const [selectedDate, setSelectedDate] = useState('')
  const [guests, setGuests] = useState((business && business.chairs && business.chairs.default) ? business.chairs.default : 2)
  const [selectedTable, setSelectedTable] = useState(null)

  useEffect(() => {
    if (!business) return
    try {
      const raw = localStorage.getItem('mock_tables')
      const all = raw ? JSON.parse(raw) : (Array.isArray(tables) ? tables : [])
      const my = (Array.isArray(all) ? all.filter(t => Number(t.restaurantId) === Number(business.id)) : [])
      const each = my.length ? my : (Array.isArray(tables) ? tables : [])
      const prices = []
      each.forEach(t => { if (Array.isArray(t.slots)) t.slots.forEach(s => { if (s && s.pricePerSeat) prices.push(Number(s.pricePerSeat)) }) })
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
  }, [business, tables])

  useEffect(() => {
    if (!business) { setCoverUrl(null); return }
    const cv = business.cover || business.img || ''
    let url = ''
    let objectUrl = null
    try {
      const publicBase = (process.env.PUBLIC_URL || '').replace(/\/$/, '')
      if (!cv) url = ''
      else if (typeof cv === 'string') {
        if (cv.startsWith('http') || cv.startsWith('data:')) url = cv
        else if (cv.startsWith('/')) url = publicBase + cv
        else url = publicBase + '/' + (cv.startsWith('./') ? cv.replace(/^\.\//, '') : cv)
      } else if (cv instanceof File) {
        objectUrl = URL.createObjectURL(cv)
        url = objectUrl
      } else if (cv && typeof cv === 'object' && cv.url) {
        url = cv.url
      } else {
        url = ''
      }
    } catch (e) { url = '' }
    setCoverUrl(url || null)
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl) }
  }, [business])

  function handleReserve() {
    const booking = { restaurantId: business.id, tableId: selectedTable, start: selectedDate, seatsBooked: guests, pricePerSeat: pricePerPerson, total: pricePerPerson ? Number(pricePerPerson) * Number(guests) : undefined, status: 'demo' }
    const raw = localStorage.getItem('mock_bookings')
    const arr = raw ? JSON.parse(raw) : []
    arr.push(booking)
    localStorage.setItem('mock_bookings', JSON.stringify(arr))
    alert('Reserva demo guardada en localStorage')
  }

  if (!business) return <div style={{ padding: 32 }}>Cargando ficha...</div>

  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
        <img src={coverUrl || 'https://via.placeholder.com/1000x400'} alt="cover" style={{ width: '100%', height: 400, objectFit: 'cover' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 }}>
        <div>
          <h1 style={{ margin: 0 }}>{business.name || business.title}</h1>
          <div style={{ color: '#666' }}>{business.category || 'Negocio'} · {business.address?.city || business.location || ''}</div>
          {business.tags && business.tags.length > 0 && (
            <div style={{ marginTop: 8 }}>
              {business.tags.map(tag => (
                <span key={tag} style={{ display: 'inline-block', marginRight: 8, marginBottom: 6, background: '#f1f1f1', padding: '6px 8px', borderRadius: 16, fontSize: 13 }}>{tag}</span>
              ))}
            </div>
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ background: '#fff3ea', padding: '6px 10px', borderRadius: 8, color: '#ff6600', display: 'inline-block' }}>{business.rating || '—'}</div>
          <div style={{ marginTop: 8 }}>
            <strong>{priceRangeNumeric ? (priceRangeNumeric.min && priceRangeNumeric.max ? (`$${priceRangeNumeric.min}–$${priceRangeNumeric.max} / persona`) : (`$${priceRangeNumeric.min} / persona`)) : (business.pricePerPerson ? (`$${business.pricePerPerson} / persona`) : (business.priceRange || ''))}</strong>
            { (priceRangeNumeric || business.pricePerPerson) && (
              <div style={{ fontSize: 12, color: '#666' }}>${(priceRangeNumeric ? (priceRangeNumeric.min || 0) : business.pricePerPerson) * partySize} total (estimado para {partySize})</div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginTop: 18 }}>
        <div>
          {business.description && (
            <section style={{ marginBottom: 18 }}>
              <h3>Descripción</h3>
              <p style={{ color: '#444' }}>{business.description}</p>
            </section>
          )}

          <section style={{ marginBottom: 18 }}>
            <h3>Horario</h3>
            <p>{business.hours || 'No disponible'}</p>
          </section>

          <section style={{ marginBottom: 18 }}>
            <h3>Reservar</h3>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
              <input type="number" min={(business.chairs && business.chairs.min) || 1} max={(business.chairs && business.chairs.max) || 12} value={guests} onChange={e => setGuests(Math.max((business.chairs && business.chairs.min) || 1, Math.min((business.chairs && business.chairs.max) || 12, Number(e.target.value || (business.chairs && business.chairs.default) || 2))))} style={{ width: 80, padding: 8, fontWeight: 700 }} />
              <button onClick={() => { if (!selectedDate) return alert('Selecciona una fecha'); handleReserve() }} style={{ background:'#ff385c', color:'#fff', border:'none', padding:'8px 12px', borderRadius:8 }}>Reservar</button>
            </div>
            <TableSelector tables={business.tables || []} selectedId={selectedTable} onSelect={setSelectedTable} guests={guests} />
          </section>

          <section>
            <h3>Ubicación</h3>
            <p>{(business.address && `${business.address.address}, ${business.address.city}, ${business.address.state}`) || business.location || 'No disponible'}</p>
          </section>
        </div>

        <aside style={{ position: 'sticky', top: 24 }}>
          <div style={{ padding: 18, borderRadius: 8, background: '#fff', boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }}>
            <div style={{ marginBottom: 10 }}><strong>{business.rating || '—'}</strong> · Valoración</div>
            <div style={{ marginBottom: 12 }}>
              <strong>{pricePerPerson ? (`$${pricePerPerson} / persona`) : (business.priceRange || '')}</strong>
              {pricePerPerson && <div style={{ fontSize: 12, color: '#666' }}>${pricePerPerson * partySize} total (estimado para {partySize})</div>}
            </div>
            <button style={{ width: '100%', background: '#ff385c', color: '#fff', border: 'none', padding: '10px 12px', borderRadius: 8 }} onClick={() => { if (!selectedDate) return alert('Selecciona una fecha'); handleReserve() }}>Reservar</button>
            <div style={{ marginTop: 12, color: '#666' }}>Botón de reserva demo (no realiza pago)</div>
          </div>
        </aside>
      </div>
    </div>
  )
}
