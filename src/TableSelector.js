import React from 'react';
import './TableSelector.css';

function TableSelector({ tables = [], selectedId = null, onSelect }) {
  if (!Array.isArray(tables) || tables.length === 0) return <div>No hay mesas disponibles</div>
  return (
    <div className="tableSelector">
      <div className="tableSelector__label">Elige mesa</div>
      <div className="tableSelector__list">
        {tables.map(t => (
          <button
            key={t.id}
            className={`tableSelector__item ${selectedId === t.id ? 'selected' : ''}`}
            onClick={() => onSelect && onSelect(t.id)}
          >
            <div className="tableSelector__name">{t.name}</div>
            <div className="tableSelector__seats">{t.seats} personas</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TableSelector;
