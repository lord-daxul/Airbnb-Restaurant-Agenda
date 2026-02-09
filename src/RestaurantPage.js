import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from './services/api'
import { tables as repoTables } from './data/repoData'
import './SearchResult.css'
import BusinessDetail from './BusinessDetail'

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

  return <BusinessDetail business={restaurant} tables={restaurant.tables || []} />
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
