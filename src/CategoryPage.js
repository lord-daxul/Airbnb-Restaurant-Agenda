import React from 'react'
import { useParams, Link } from 'react-router-dom'
import restaurants from './data/restaurants'
import { tables as repoTables } from './data/repoData'
import SearchResult from './SearchResult'

const keyToCategory = {
  restaurant: 'Restaurante',
  cafe: 'Café',
  family: 'Familiar',
  event: 'Evento',
  salon: 'Salón'
}

export default function CategoryPage() {
  const { key } = useParams()
  const categoryName = keyToCategory[key] || key
  const items = restaurants.filter(r => r.category === categoryName)

  return (
    <div style={{ padding: 24 }}>
      <h1>{categoryName}</h1>
      <p style={{ color: '#666' }}>Mostrando {items.length} locales en Caracas, Distrito Capital</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 18 }}>
        {items.map(r => {
            // compute numeric range from tables if pricePerPerson not set
            let priceVal = r.pricePerPerson || r.priceRange
            try {
              if (!r.pricePerPerson) {
                const raw = localStorage.getItem('mock_tables')
                const all = raw ? JSON.parse(raw) : (Array.isArray(repoTables) ? repoTables : [])
                const my = (Array.isArray(all) ? all.filter(t => Number(t.restaurantId) === Number(r.id)) : [])
                const prices = []
                my.forEach(t => { if (Array.isArray(t.slots)) t.slots.forEach(s => { if (s && s.pricePerSeat) prices.push(Number(s.pricePerSeat)) }) })
                if (prices.length > 0) {
                  const min = Math.min(...prices)
                  const max = Math.max(...prices)
                  priceVal = (min !== max) ? { min, max } : min
                }
              }
            } catch (e) { /* ignore */ }

            return (
          <Link key={r.id} to={`/restaurant/${r.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <SearchResult
              img={r.cover}
              location={r.address.city}
              title={r.name}
              description={r.description}
              star={r.rating}
                price={priceVal}
              total={r.tags ? r.tags.join(', ') : ''}
            />
          </Link>
            )
        })}
        ))}
      </div>
    </div>
  )
}
