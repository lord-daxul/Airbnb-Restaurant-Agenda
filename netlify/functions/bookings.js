const path = require('path');
const fs = require('fs');

// Demo: read bookings.json and allow GET (filter by userId or restaurantId) and POST (simulate create)
exports.handler = async function (event) {
  try {
    const p = path.join(__dirname, '..', '..', 'data', 'bookings.json');
    const raw = fs.readFileSync(p, 'utf8');
    const data = JSON.parse(raw);

    if (event.httpMethod === 'GET') {
      const qs = event.queryStringParameters || {};
      let items = data;
      if (qs.userId) items = items.filter(b => String(b.userId) === String(qs.userId));
      if (qs.restaurantId) items = items.filter(b => String(b.restaurantId) === String(qs.restaurantId));
      return { statusCode: 200, body: JSON.stringify(items) };
    }

    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body || '{}');
      // Simple validation
      if (!body.userId || !body.restaurantId || !body.tableId || !body.start || !body.end || !body.seatsBooked) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields' }) };
      }
      const newBooking = Object.assign({ id: data.length + 1, status: 'confirmed' }, body);
      // In demo we don't persist; return simulated booking
      return { statusCode: 201, body: JSON.stringify(newBooking) };
    }

    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
