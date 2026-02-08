const BASE = process.env.REACT_APP_API_BASE || '/.netlify/functions';

async function request(path, opts = {}) {
  const res = await fetch(`${BASE}/${path}`, opts);
  const text = await res.text();
  try { return JSON.parse(text); } catch (e) { return text; }
}

export async function fetchListings() {
  return request('listings');
}

export async function login({ email, password }) {
  return request('login', { method: 'POST', body: JSON.stringify({ email, password }), headers: { 'Content-Type': 'application/json' } });
}

export async function register(user) {
  return request('register', { method: 'POST', body: JSON.stringify(user), headers: { 'Content-Type': 'application/json' } });
}

export default { fetchListings, login, register };
