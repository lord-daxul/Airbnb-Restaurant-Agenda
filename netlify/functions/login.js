const path = require('path');
const fs = require('fs');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  try {
    const body = JSON.parse(event.body || '{}');
    const { email, password } = body;
    const p = path.join(__dirname, '..', '..', 'data', 'users.json');
    const raw = fs.readFileSync(p, 'utf8');
    const users = JSON.parse(raw);
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { statusCode: 401, body: JSON.stringify({ error: 'Invalid credentials' }) };
    const safe = Object.assign({}, user);
    delete safe.password;
    // mock token
    const token = `demo-token-${user.id}`;
    return { statusCode: 200, body: JSON.stringify({ token, user: safe }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
