import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../panels.css';

function UserPanel() {
  const [tab, setTab] = useState('profile');
  const [user] = useState(() => {
    const raw = localStorage.getItem('demo_user');
    return raw ? JSON.parse(raw) : null;
  });
  const [bookings, setBookings] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    api.fetchRestaurants().then(setRestaurants).catch(() => {});
    if (user && user.id) {
      api.fetchBookings({ userId: user.id }).then(setBookings).catch(() => {});
      api.fetchFavorites(user.id).then(setFavorites).catch(() => {});
    }
  }, [user]);

  function renderProfile() {
    if (!user) return <div>Sin sesión. Inicia sesión para ver tu perfil.</div>;
    return (
      <div className="panel-card">
        <h3>Perfil</h3>
        <div><strong>Nombre:</strong> {user.name} {user.lastname}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Teléfono:</strong> {user.phone}</div>
        <div><strong>Estado:</strong> {user.state}</div>
        <div><strong>Municipio:</strong> {user.municipality}</div>
      </div>
    );
  }

  function renderBookings() {
    return (
      <div className="panel-card">
        <h3>Reservas realizadas</h3>
        <table className="simple-table">
          <thead>
            <tr><th>Restaurant</th><th>Fecha</th><th>Hora</th><th>Asientos</th></tr>
          </thead>
          <tbody>
            {bookings.map(b => {
              const r = restaurants.find(x => x.id === b.restaurantId) || {};
              const start = new Date(b.start);
              return (
                <tr key={b.id} onClick={() => alert(JSON.stringify(b, null, 2))} style={{ cursor: 'pointer' }}>
                  <td>{r.name || b.restaurantId}</td>
                  <td>{start.toLocaleDateString()}</td>
                  <td>{start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td>{b.seatsBooked}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  function renderFavorites() {
    return (
      <div className="panel-card">
        <h3>Favoritos</h3>
        <ul>
          {favorites.map(f => {
            const r = restaurants.find(x => x.id === f.restaurantId) || { name: f.restaurantId };
            return <li key={f.id}>{r.name}</li>;
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="panel-root">
      <h2>Panel de Usuario</h2>
      <div className="panel-tabs">
        <button onClick={() => setTab('profile')} className={tab==='profile'? 'active':''}>Perfil</button>
        <button onClick={() => setTab('bookings')} className={tab==='bookings'? 'active':''}>Reservas</button>
        <button onClick={() => setTab('favorites')} className={tab==='favorites'? 'active':''}>Favoritos</button>
      </div>
      <div className="panel-body">
        {tab === 'profile' && renderProfile()}
        {tab === 'bookings' && renderBookings()}
        {tab === 'favorites' && renderFavorites()}
      </div>
    </div>
  );
}

export default UserPanel;
