const path = require('path');
const fs = require('fs');

exports.handler = async function (event) {
  try {
    const p = path.join(__dirname, '..', '..', 'data', 'tables.json');
    const raw = fs.readFileSync(p, 'utf8');
    const data = JSON.parse(raw);
    const restaurantId = event.queryStringParameters && event.queryStringParameters.restaurantId;
    if (restaurantId) {
      const items = data.filter(t => String(t.restaurantId) === String(restaurantId));
      return { statusCode: 200, body: JSON.stringify(items) };
    }
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
