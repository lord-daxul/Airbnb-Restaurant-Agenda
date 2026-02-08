const path = require('path');
const fs = require('fs');

exports.handler = async function () {
  try {
    const p = path.join(__dirname, '..', '..', 'data', 'users.json');
    const raw = fs.readFileSync(p, 'utf8');
    const data = JSON.parse(raw);
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
