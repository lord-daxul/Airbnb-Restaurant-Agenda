import React from 'react';
import './Card.css'

function Card({ src, title, description, price }) {
    const isNumber = (v) => (typeof v === 'number' && Number.isFinite(v)) || (!isNaN(Number(v)) && String(v).trim() !== '');
    const priceDisplay = isNumber(price) ? `$${Number(price)} / persona` : price;
    return (
        <div className='card'>
            <img src={src} alt="" />
            <div className="card__info">
                <h2>{title}</h2>
                <h4>{description}</h4>
                <h3>{priceDisplay}</h3>
            </div>
        </div>
    )
}

export default Card
