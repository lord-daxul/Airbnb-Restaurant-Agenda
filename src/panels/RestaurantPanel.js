import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import '../panels.css';

function RestaurantPanel() {
  const { id } = useParams();
  const restId = Number(id);
  const [tab, setTab] = useState('profile');
  const [restaurant, setRestaurant] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    if (!restId) return;
    api.fetchRestaurant(restId).then(setRestaurant).catch(() => {});
    api.fetchBookings({ restaurantId: restId }).then(setBookings).catch(() => {});
    api.fetchTables(restId).then(setTables).catch(() => {});
  }, [restId]);

  function renderProfile() {
    if (!restaurant) return <div>Cargando...</div>;
    return (
      <div className="panel-card">
        <h3>{restaurant.name}</h3>
        <div><strong>Rating:</strong> {restaurant.rating}</div>
      </div>
    );
  }

  function renderBookings() {
    return (
      <div className="panel-card">
        <h3>Reservas recibidas</h3>
        <table className="simple-table">
          <thead><tr><th>UserId</th><th>Fecha</th><th>Hora</th><th>Asientos</th></tr></thead>
          <tbody>
            {bookings.map(b => {
              const start = new Date(b.start);
              return (
                <tr key={b.id}><td>{b.userId}</td><td>{start.toLocaleDateString()}</td><td>{start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td><td>{b.seatsBooked}</td></tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  function renderTables() {
    return (
      <div className="panel-card">
        <h3>Mesas</h3>
        <table className="simple-table">
          <thead><tr><th>Nombre</th><th>Capacidad</th><th>Slots</th></tr></thead>
          <tbody>
            {tables.map(t => (
              <tr key={t.id}><td>{t.name}</td><td>{t.capacity}</td><td>{t.slots.map(s => `${s.start}-${s.end} ($${s.pricePerSeat})`).join(', ')}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function renderAddTable() {
    return (
      <div className="panel-card">
        <h3>Agregar mesa (simulado)</h3>
        <p>Este demo no persiste mesas, pero aquí puede existir un formulario para agregar.</p>
      </div>
    );
  }

  function renderAddress() {
    if (!restaurant) return null;
    const a = restaurant.address || {};
    return (
      <div className="panel-card">
        <h3>Dirección</h3>
        <div><strong>Estado:</strong> {a.state}</div>
        <div><strong>Ciudad:</strong> {a.city}</div>
        <div><strong>Dirección:</strong> {a.address}</div>
        <div><strong>Teléfono:</strong> {a.phone}</div>
      </div>
    );
  }

  return (
    <div className="panel-root">
      <h2>Panel del Restaurante {restaurant ? `- ${restaurant.name}` : ''}</h2>
      <div className="panel-tabs">
        <button onClick={() => setTab('profile')} className={tab==='profile'? 'active':''}>Perfil</button>
        <button onClick={() => setTab('bookings')} className={tab==='bookings'? 'active':''}>Reservas</button>
        <button onClick={() => setTab('tables')} className={tab==='tables'? 'active':''}>Mesas</button>
        <button onClick={() => setTab('add')} className={tab==='add'? 'active':''}>Agregar Mesa</button>
        <button onClick={() => setTab('address')} className={tab==='address'? 'active':''}>Dirección</button>
      </div>
      <div className="panel-body">
        {tab === 'profile' && renderProfile()}
        {tab === 'bookings' && renderBookings()}
        {tab === 'tables' && renderTables()}
        {tab === 'add' && renderAddTable()}
        {tab === 'address' && renderAddress()}
      </div>
    </div>
  );
}

export default RestaurantPanel;
