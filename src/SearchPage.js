import React, { useMemo } from 'react';
import './SearchPage.css';
import { Button } from "@material-ui/core";
import SearchResult from "./SearchResult";
import { useTranslation } from './i18n';
import { useLocation, Link } from 'react-router-dom';
import restaurantsJson from './data/restaurants.json';
import restaurantsJs from './data/restaurants.js';
import listingsData from './data/listings.json';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SearchPage() {
    const { t } = useTranslation();
    const query = useQuery();
    // support both `listings` (new convention) and `category` (backwards compat)
    const categoryQ = (query.get('listings') || query.get('category') || '').trim();
    const locationQ = (query.get('location') || '').trim().toLowerCase();

    const combined = useMemo(() => {
        const restaurantsData = (Array.isArray(restaurantsJs) && restaurantsJs.length) > (Array.isArray(restaurantsJson) ? restaurantsJson.length : 0)
            ? restaurantsJs
            : restaurantsJson;

        // Normalize restaurants
        const fromRestaurants = (restaurantsData || []).map(r => ({
            id: `r-${r.id}`,
            origId: r.id,
            img: r.cover || '',
            // keep raw address pieces for more robust matching
            addressCity: r.address && r.address.city ? r.address.city : '',
            addressState: r.address && r.address.state ? r.address.state : '',
            addressStreet: r.address && r.address.address ? r.address.address : '',
            location: r.address && r.address.city ? `${r.address.city}, ${r.address.state}` : (r.address && r.address.location) || '',
            title: r.name,
            description: r.description || '',
            star: r.rating || 0,
            price: r.pricePerPerson || r.priceRange || null,
            tags: Array.isArray(r.tags) ? r.tags : [],
            category: r.category || '',
            rawType: 'restaurant'
        }));

        // Normalize listings (older or repo format) and include address fields
        const fromListings = (listingsData || []).map(l => ({
            id: `l-${l.id}`,
            origId: l.id,
            img: l.cover || l.img || '',
            // keep raw address pieces for robust matching similar to restaurants
            addressCity: (l.address && l.address.city) || '',
            addressState: (l.address && l.address.state) || '',
            addressStreet: (l.address && l.address.address) || '',
            location: l.location || (l.address && l.address.city ? `${l.address.city}${l.address.state ? ', ' + l.address.state : ''}` : ''),
            title: l.title || l.name || '',
            description: l.description || '',
            star: l.rating || 0,
            price: l.price || null,
            tags: Array.isArray(l.tags) ? l.tags : [],
            category: l.category || '',
            rawType: 'listing'
        }));

        return [...fromRestaurants, ...fromListings];
    }, []);

    const filtered = useMemo(() => {
        const normalize = s => (String(s || '')
            .normalize ? String(s || '').normalize('NFD').replace(/\p{Diacritic}/gu, '') : String(s || ''))
            .toLowerCase();

        const nLocationQ = normalize(locationQ);
        const nCategoryQ = normalize(categoryQ);

        return combined.filter(item => {
            // LOCATION: check multiple address fields
            if (nLocationQ) {
                const parts = [item.location, item.addressCity, item.addressState, item.addressStreet, item.location].filter(Boolean);
                const joined = normalize(parts.join(' '));
                if (!joined.includes(nLocationQ)) return false;
            }

            // CATEGORY: check category, tags, title and description with accent-insensitive matching
            if (nCategoryQ) {
                const cat = normalize(item.category || '');
                if (cat && cat.includes(nCategoryQ)) return true;

                const tagsJoined = normalize((item.tags || []).join(' '));
                if (tagsJoined && tagsJoined.includes(nCategoryQ)) return true;

                const inTitle = normalize(item.title || '').includes(nCategoryQ);
                const inDesc = normalize(item.description || '').includes(nCategoryQ);
                if (!(inTitle || inDesc)) return false;
            }

            return true;
        });
    }, [combined, categoryQ, locationQ]);

    return (
        <div className='searchPage'>
            <div className='searchPage__info'>
                <p>{t('search.summary')}</p>
                <h1>{t('search.heading')}</h1>
                <Button variant="outlined">{t('search.filter.cancellation')}</Button>
                <Button variant="outlined">{t('search.filter.type')}</Button>
                <Button variant="outlined">{t('search.filter.price')}</Button>
                <Button variant="outlined">{t('search.filter.rooms')}</Button>
                <Button variant="outlined">{t('search.filter.more')}</Button>
            </div>

            {filtered.length === 0 && (
                <p className="searchPage__empty">{t('search.noResults') || 'No se encontraron resultados'}</p>
            )}

            {filtered.map(item => {
                const to = item.rawType === 'listing' ? `/listing/${item.origId}` : `/restaurant/${item.origId}`
                return (
                    <Link key={item.id} to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <SearchResult
                            img={item.img || '/images/placeholder.png'}
                            location={item.location}
                            title={item.title}
                            description={item.description}
                            star={item.star}
                            price={item.price}
                            rawType={item.rawType}
                            origId={item.origId}
                        />
                    </Link>
                )
            })}
        </div>
    )
}

export default SearchPage
