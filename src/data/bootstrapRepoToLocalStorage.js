import { users, restaurants, tables, bookings, favorites, listings } from './repoData'

// Copy repo data into localStorage keys used by the demo if not present.
export function bootstrapRepoToLocalStorage({ force = false } = {}) {
  try {
    if (force || !localStorage.getItem('mock_users')) localStorage.setItem('mock_users', JSON.stringify(users || []))
    if (force || !localStorage.getItem('mock_restaurants')) localStorage.setItem('mock_restaurants', JSON.stringify(restaurants || []))
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
