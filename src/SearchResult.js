import React from 'react';
import './SearchResult.css';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import StarIcon from "@material-ui/icons/Star";

function SearchResult({
    img,
    location,
    title,
    description,
    star,
    price,
    total,
    partySize = 2,
}) {
    // price can be:
    // - a preformatted string (i18n)
    // - a numeric value per person
    // - an object { min, max } representing a numeric range per person
    const isNumber = (v) => (typeof v === 'number' && Number.isFinite(v)) || (!isNaN(Number(v)) && String(v).trim() !== '');
    let priceDisplay = '';
    let totalDisplay = '';

    if (price && typeof price === 'object' && (price.min !== undefined || price.max !== undefined)) {
        const min = Number(price.min || price.max || 0)
        const max = Number(price.max || price.min || 0)
        if (min && max && min !== max) priceDisplay = `$${min}–$${max} / persona`
        else priceDisplay = `$${min} / persona`
        const rep = min || max || 0
        const tot = rep * Number(partySize || 2)
        totalDisplay = total || `$${tot} total (estimado para ${partySize})`
    } else if (isNumber(price) && !isNaN(Number(price))) {
        const p = Number(price);
        priceDisplay = `$${p} / persona`;
        const tot = p * Number(partySize || 2);
        totalDisplay = total || `$${tot} total (estimado para ${partySize})`;
    } else {
        priceDisplay = price || '';
        totalDisplay = total || '';
    }

    return (
        <div className='searchResult'>
            <img src={img} alt="" />
            <FavoriteBorderIcon className="searchResult__heart" />

            <div className='searchResult__info'>
                <div className="searchResult__infoTop">
                    <p>{location}</p>
                    <h3>{title}</h3>
                    <p>____</p>
                    <p>{description}</p>
                </div>

                <div className="searchResult__infoBottom">
                    <div className="searchResult__stars">
                        <StarIcon className="searchResult__star" />
                        <p>
                            <strong>{star}</strong>
                        </p>
                    </div>
                    <div className='searchResults__price'>
                        <h2>{priceDisplay}</h2>
                        <p>{totalDisplay}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResult
