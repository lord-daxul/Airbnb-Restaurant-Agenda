import React from 'react';
import './TableSelector.css';

function TableSelector({ tables = [], selectedId = null, onSelect, guests = 2 }) {
  if (!Array.isArray(tables) || tables.length === 0) return <div>No hay mesas disponibles</div>
  return (
    <div className="tableSelector">
      <div className="tableSelector__label">Elige mesa</div>
      <div className="tableSelector__list">
        {tables.map(t => {
          const fits = Number(t.seats || 0) >= Number(guests || 0)
          return (
            <button
              key={t.id}
              className={`tableSelector__item ${selectedId === t.id ? 'selected' : ''} ${!fits ? 'disabled' : ''}`}
              onClick={() => { if (!fits) { alert('La mesa no tiene suficiente capacidad para el número de comensales'); return } ; onSelect && onSelect(t.id) }}
              disabled={!fits}
            >
              <div className="tableSelector__name">{t.name}</div>
              <div className="tableSelector__seats">{t.seats} personas</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default TableSelector;
