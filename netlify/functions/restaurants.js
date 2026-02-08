const path = require('path');
const fs = require('fs');

exports.handler = async function (event) {
  try {
    const p = path.join(__dirname, '..', '..', 'data', 'restaurants.json');
    const raw = fs.readFileSync(p, 'utf8');
    const data = JSON.parse(raw);
    const id = event.queryStringParameters && event.queryStringParameters.id;
    if (id) {
      const item = data.find(r => String(r.id) === String(id));
      if (!item) return { statusCode: 404, body: JSON.stringify({ error: 'Not found' }) };
      return { statusCode: 200, body: JSON.stringify(item) };
    }
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
