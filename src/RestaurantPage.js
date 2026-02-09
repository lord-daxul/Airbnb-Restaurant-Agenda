import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from './services/api'
import { tables as repoTables, restaurants as repoRestaurants, listings as repoListings } from './data/repoData'
import './SearchResult.css'
import BusinessDetail from './BusinessDetail'

function RestaurantPage() {
  const { id } = useParams()
  const restId = Number(id)
  const [restaurant, setRestaurant] = useState(null)
  // reservation UI handled in BusinessDetail; avoid unused state here

  useEffect(() => {
    if (!restId) return
    let resolved = false
    api.fetchRestaurant(restId).then(r => {
      if (r && r.name) { setRestaurant(r); resolved = true }
    }).catch(() => {})

    // if api didn't resolve, try localStorage mock data and repo data
    setTimeout(() => {
      if (resolved) return
      try {
        const rawListings = localStorage.getItem('mock_listings')
        const rawRestaurants = localStorage.getItem('mock_restaurants')
        const fromListings = rawListings ? JSON.parse(rawListings) : []
        const fromRestaurants = rawRestaurants ? JSON.parse(rawRestaurants) : []
        let found = null
        if (Array.isArray(fromListings)) found = fromListings.find(x => Number(x.id) === restId)
        if (!found && Array.isArray(fromRestaurants)) found = fromRestaurants.find(x => Number(x.id) === restId)
        if (!found && Array.isArray(repoListings)) found = repoListings.find(x => Number(x.id) === restId)
        if (!found && Array.isArray(repoRestaurants)) found = repoRestaurants.find(x => Number(x.id) === restId)
        if (found) { setRestaurant(found); resolved = true; return }
      } catch (e) { /* ignore parse errors */ }
      if (!resolved) setRestaurant(sampleRestaurant(restId))
    }, 100)
  }, [restId])

  useEffect(() => {
    // pricing and table selection moved to BusinessDetail; keep RestaurantPage lean
  }, [restaurant])

  // reservation logic moved to BusinessDetail; no local handler needed

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
