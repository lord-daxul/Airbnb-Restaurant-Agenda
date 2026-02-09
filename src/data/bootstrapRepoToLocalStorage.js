import { users, restaurants, tables, bookings, favorites, listings } from './repoData'

// Copy repo data into localStorage keys used by the demo if not present.
export function bootstrapRepoToLocalStorage({ force = false } = {}) {
  try {
    if (force || !localStorage.getItem('mock_users')) localStorage.setItem('mock_users', JSON.stringify(users || []))
    if (force || !localStorage.getItem('mock_restaurants')) {
      // If repo provides explicit restaurants use them, otherwise derive from listings for compatibility
      if (Array.isArray(restaurants) && restaurants.length > 0) {
        localStorage.setItem('mock_restaurants', JSON.stringify(restaurants || []))
      } else if (Array.isArray(listings) && listings.length > 0) {
        const mapped = listings.map(l => ({
          id: l.id,
          name: l.title || l.name || ('Negocio ' + l.id),
          category: l.category || 'Negocio',
          tags: l.tags || [],
          rating: l.rating || 0,
          priceRange: l.price ? (`$${l.price}`) : (l.priceRange || ''),
          description: l.description || '',
          hours: l.hours || '',
          address: { city: (l.location ? String(l.location).split(',')[0].trim() : ''), state: '' },
          cover: l.cover || ''
        }))
        localStorage.setItem('mock_restaurants', JSON.stringify(mapped))
      } else {
        localStorage.setItem('mock_restaurants', JSON.stringify(restaurants || []))
      }
    }
    if (force || !localStorage.getItem('mock_tables')) localStorage.setItem('mock_tables', JSON.stringify(tables || []))
    if (force || !localStorage.getItem('mock_bookings')) localStorage.setItem('mock_bookings', JSON.stringify(bookings || []))
    if (force || !localStorage.getItem('mock_favorites')) localStorage.setItem('mock_favorites', JSON.stringify(favorites || []))
    if (force || !localStorage.getItem('mock_listings')) localStorage.setItem('mock_listings', JSON.stringify(listings || []))
    // ensure demo_user exists (optional)
    if (!localStorage.getItem('demo_user')) {
      const su = (users && users.find(u => u.role === 'superadmin')) || (users && users[0])
      if (su) localStorage.setItem('demo_user', JSON.stringify(su))
    }
  } catch (e) {
    // ignore in non-browser environments
    // console.warn('bootstrap failed', e)
  }
}

export default bootstrapRepoToLocalStorage
