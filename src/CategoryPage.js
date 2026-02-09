import React from 'react'
import { useParams, Link } from 'react-router-dom'
import restaurants from './data/restaurants'
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
        {items.map(r => (
          <Link key={r.id} to={`/restaurant/${r.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <SearchResult
              img={r.cover}
              location={r.address.city}
              title={r.name}
              description={r.description}
              star={r.rating}
              price={r.pricePerPerson || r.priceRange}
              total={r.tags ? r.tags.join(', ') : ''}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
