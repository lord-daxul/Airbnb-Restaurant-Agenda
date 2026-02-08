const path = require('path');
const fs = require('fs');

// Demo: GET favorites by userId, POST to toggle (simulated)
exports.handler = async function (event) {
  try {
    const p = path.join(__dirname, '..', '..', 'data', 'favorites.json');
    const raw = fs.readFileSync(p, 'utf8');
    const data = JSON.parse(raw);

    if (event.httpMethod === 'GET') {
      const qs = event.queryStringParameters || {};
      if (!qs.userId) return { statusCode: 400, body: JSON.stringify({ error: 'userId required' }) };
      const items = data.filter(f => String(f.userId) === String(qs.userId));
      return { statusCode: 200, body: JSON.stringify(items) };
    }

    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body || '{}');
      if (!body.userId || !body.restaurantId) return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields' }) };
      // Simulate toggle: if exists, return removed, else return added
      const exists = data.find(f => String(f.userId) === String(body.userId) && String(f.restaurantId) === String(body.restaurantId));
      if (exists) {
        return { statusCode: 200, body: JSON.stringify({ removed: true, id: exists.id }) };
      }
      const newFav = { id: data.length + 1, userId: body.userId, restaurantId: body.restaurantId };
      return { statusCode: 201, body: JSON.stringify(newFav) };
    }

    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
