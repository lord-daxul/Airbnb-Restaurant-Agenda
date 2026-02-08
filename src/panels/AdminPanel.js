import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../panels.css';

function AdminPanel() {
  const [restaurants, setRestaurants] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.fetchRestaurants().then(setRestaurants).catch(() => {});
    api.fetchUsers().then(setUsers).catch(() => {});
  }, []);

  return (
    <div className="panel-root">
      <h2>Panel Super Admin</h2>
      <div className="panel-grid">
        <div className="panel-card">
          <h3>Restaurantes</h3>
          <ul>
            {restaurants.map(r => (
              <li key={r.id}><Link to={`/panel/restaurant/${r.id}`}>{r.name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="panel-card">
          <h3>Usuarios</h3>
          <table className="simple-table">
            <thead><tr><th>ID</th><th>Nombre</th><th>Email</th></tr></thead>
            <tbody>
              {users.map(u => (<tr key={u.id}><td>{u.id}</td><td>{u.name} {u.lastname}</td><td>{u.email}</td></tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
