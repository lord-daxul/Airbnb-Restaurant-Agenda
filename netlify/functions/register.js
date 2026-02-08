const path = require('path');
const fs = require('fs');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  try {
    const body = JSON.parse(event.body || '{}');
    const { name, lastname, email, password, phone, state, municipality } = body;
    const p = path.join(__dirname, '..', '..', 'data', 'users.json');
    const raw = fs.readFileSync(p, 'utf8');
    const users = JSON.parse(raw);
    const exists = users.find(u => u.email === email);
    if (exists) return { statusCode: 409, body: JSON.stringify({ error: 'User exists' }) };
    // For demo we don't persist on Netlify; respond with created user object
    const newUser = {
      id: users.length + 1,
      name, lastname, email, password, phone, state, municipality
    };
    const safe = Object.assign({}, newUser);
    delete safe.password;
    return { statusCode: 201, body: JSON.stringify({ user: safe, message: 'Registration simulated (demo)' }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
