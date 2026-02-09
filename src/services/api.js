const BASE = process.env.REACT_APP_API_BASE || '/.netlify/functions';

async function request(path, opts = {}) {
  const res = await fetch(`${BASE}/${path}`, opts);
  const text = await res.text();
  try { return JSON.parse(text); } catch (e) { return text; }
}

export async function fetchListings() {
  return request('listings');
}

export async function fetchRestaurants() { return request('restaurants'); }
export async function fetchRestaurant(id) { return request(`restaurants?id=${id}`); }
export async function fetchTables(restaurantId) { return request(`tables?restaurantId=${restaurantId}`); }

export async function fetchBookings(params = {}) {
  const qs = new URLSearchParams(params).toString();
  return request(`bookings${qs ? ('?' + qs) : ''}`);
}

export async function createBooking(body) {
  return request('bookings', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
}

export async function fetchFavorites(userId) { return request(`favorites?userId=${userId}`); }
export async function toggleFavorite(body) { return request('favorites', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } }); }

export async function fetchUsers() { return request('users'); }

export async function login({ identifier, password }) {
  return request('login', { method: 'POST', body: JSON.stringify({ identifier, password }), headers: { 'Content-Type': 'application/json' } });
}

export async function register(user) {
  return request('register', { method: 'POST', body: JSON.stringify(user), headers: { 'Content-Type': 'application/json' } });
}

const api = { fetchListings, fetchRestaurants, fetchRestaurant, fetchTables, fetchBookings, createBooking, fetchFavorites, toggleFavorite, fetchUsers, login, register };

export default api;
