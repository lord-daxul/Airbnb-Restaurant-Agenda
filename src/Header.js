import React, { useState, useRef, useEffect } from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from './i18n';
import HomeIcon from '@material-ui/icons/Home';
import ReceiptIcon from '@material-ui/icons/Receipt';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonIcon from '@material-ui/icons/Person';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import GroupIcon from '@material-ui/icons/Group';
import EventIcon from '@material-ui/icons/Event';
import SpaIcon from '@material-ui/icons/Spa';
import RoomIcon from '@material-ui/icons/Room';
import TuneIcon from '@material-ui/icons/Tune';

function Header() {
    const { t, lang, setLang } = useTranslation();
        const [menuOpen, setMenuOpen] = useState(false);
        const menuRef = useRef(null);

        useEffect(() => {
            function handleClick(e) {
                if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
            }
            document.addEventListener('click', handleClick);
            return () => document.removeEventListener('click', handleClick);
        }, []);

        const categories = [
            { key: 'restaurant', label: 'category.restaurant', Icon: LocalDiningIcon },
            { key: 'cafe', label: 'category.cafe', Icon: LocalCafeIcon },
            { key: 'family', label: 'category.family', Icon: GroupIcon },
            { key: 'event', label: 'category.event', Icon: EventIcon },
            { key: 'salon', label: 'category.salon', Icon: SpaIcon }
        ];
    const [whatOpen, setWhatOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState(categories[0].key);
    const [location, setLocation] = useState('Caracas');
    const searchRef = useRef(null);
    const history = useHistory();

    async function detectCity() {
        if (!navigator.geolocation) {
            alert('Geolocalización no soportada en este navegador');
            return;
        }
        try {
            setLocation('Detectando...');
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const { latitude, longitude } = pos.coords;
                const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
                if (!key) {
                    alert('Falta REACT_APP_GOOGLE_MAPS_API_KEY en el entorno');
                    setLocation('');
                    return;
                }
                try {
                    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`;
                    const res = await fetch(url);
                    const data = await res.json();
                    if (data.status === 'OK' && data.results && data.results.length) {
                        let city = '';
                        let state = '';
                        // Prefer a result that contains a locality
                        let found = false;
                        for (const r of data.results) {
                            const locality = r.address_components.find(c => c.types && c.types.includes('locality'));
                            if (locality) {
                                city = locality.long_name;
                                const admin = r.address_components.find(c => c.types && c.types.includes('administrative_area_level_1'));
                                if (admin) state = admin.long_name;
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            const comps = data.results[0].address_components || [];
                            const comp = comps.find(c => c.types && (c.types.includes('administrative_area_level_2') || c.types.includes('administrative_area_level_1')));
                            if (comp) city = comp.long_name;
                        }
                        const label = city ? (state ? `${city}, ${state}` : city) : `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
                        setLocation(label);
                    } else {
                        setLocation('');
                        alert('No se pudo obtener la ciudad desde la API de Geocoding');
                    }
                } catch (err) {
                    setLocation('');
                    alert('Error consultando la API de Geocoding');
                }
            }, (err) => {
                setLocation('');
                alert('Permiso de geolocalización denegado o error');
            });
        } catch (err) {
            setLocation('');
            alert('Error al intentar detectar ubicación');
        }
    }

    function doSearch() {
        const q = new URLSearchParams({ listings: selectedListing, location });
        history.push(`/search?${q.toString()}`);
    }

    useEffect(() => {
        function handleClick(e) {
            if (searchRef.current && !searchRef.current.contains(e.target)) setWhatOpen(false);
        }
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className='header'>
            <Link to='/'>
                <img
                    className="header__icon"
                    src="https://i.pinimg.com/originals/3c/bf/be/3cbfbe148597341fa56f2f87ade90956.png"
                    alt=""
                />
            </Link>

                        {/* Desktop categories row (kept for navigation) */}
                        <div className="header__categories">
                            {categories.map(c => {
                                const Icon = c.Icon;
                                return (
                                    <Link key={c.key} to={`/category/${c.key}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div className="header__category">
                                            <Icon className="header__categoryIcon" />
                                            <div className="header__categoryLabel">{t(c.label)}</div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Mobile header: location + compact search + avatar */}
                        <div className="mobile-header">
                            <div className="mobile-header__top">
                                <div className="mobile-location">
                                        <RoomIcon className="mobile-location__icon" onClick={detectCity} style={{ cursor: 'pointer' }} title="Detectar ciudad" />
                                        <div className="mobile-location__text">
                                            <div className="mobile-location__label">{t('search.where')}</div>
                                            <div className="mobile-location__place">{location || '—'}</div>
                                        </div>
                                    </div>
                                <div className="mobile-avatar">
                                    <Avatar onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: 'pointer', width:36, height:36 }} />
                                </div>
                            </div>

                            <div className="mobile-search">
                                <div className="mobile-search__input">
                                    <SearchIcon />
                                    <input
                                        value={location}
                                        onChange={e => setLocation(e.target.value)}
                                        onKeyDown={e => { if (e.key === 'Enter') doSearch(); }}
                                        placeholder={t('search.where')}
                                    />
                                </div>
                                <button className="mobile-search__button" onClick={doSearch}><SearchIcon /></button>
                            </div>

                            <div className="mobile-categories">
                                <div
                                    className={`chip ${selectedListing === 'entire' ? 'active' : ''}`}
                                    onClick={() => setSelectedListing('entire')}
                                >{t('home.entire_homes')}</div>
                                {categories.map(c => (
                                    <div
                                        key={c.key}
                                        className={`chip ${selectedListing === c.key ? 'active' : ''}`}
                                        onClick={() => setSelectedListing(c.key)}
                                    >{t(c.label)}</div>
                                ))}
                            </div>
                        </div>
           
            {/* Center search: What | Where | Button */}
            <div className='header__center' ref={searchRef}>
                <div className="search-bar">
                    <div className="search-part what" onClick={() => setWhatOpen(!whatOpen)}>
                        <div className="search-label">{t('search.what')}</div>
                        <div className="search-value">{t(categories.find(c=>c.key===selectedListing).label)}</div>
                        <ExpandMoreIcon className="search-caret" />
                        {whatOpen && (
                            <div className="what-dropdown">
                                {categories.map(c => {
                                    const Icon = c.Icon;
                                    return (
                                        <div key={c.key} className="what-item" onClick={() => { setSelectedListing(c.key); setWhatOpen(false); }}>
                                            <Icon className="what-item__icon" />
                                            <div className="what-item__label">{t(c.label)}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    <div className="search-part where">
                        <div className="search-label">{t('search.where')}</div>
                        <div className="where-input">
                            <RoomIcon className="where-icon" onClick={detectCity} style={{ cursor: 'pointer' }} title="Detectar ciudad" />
                            <input value={location} onChange={e=>setLocation(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') doSearch(); }} />
                        </div>
                    </div>

                    <div className="search-part button">
                        <button className="search-button" onClick={doSearch}><SearchIcon /> <span>{t('search.go')}</span></button>
                    </div>
                </div>
            </div>

            <div className='header__right'>
                <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', margin: '0 8px' }}>
                    <p>Login</p>
                </Link>
                <LanguageIcon />
                <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    aria-label="language-select"
                    style={{ margin: '0 8px' }}
                >
                    <option value="en">EN</option>
                    <option value="es">ES</option>
                </select>
                                <ExpandMoreIcon />
                                <div className="avatar-wrapper" ref={menuRef}>
                                    <Avatar onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: 'pointer' }} />
                                    {menuOpen && (
                                        <div className="avatar-menu" role="menu">
                                            <Link to="/" className="avatar-menu__item">{<HomeIcon />} <span>{t('footer.menu.home')}</span></Link>
                                            <Link to="/orders" className="avatar-menu__item">{<ReceiptIcon />} <span>{t('footer.menu.orders')}</span></Link>
                                            <Link to="/search" className="avatar-menu__item">{<SearchIcon />} <span>{t('footer.menu.search')}</span></Link>
                                            <Link to="/visited" className="avatar-menu__item">{<VisibilityIcon />} <span>{t('footer.menu.visited')}</span></Link>
                                            <Link to="/profile" className="avatar-menu__item">{<PersonIcon />} <span>{t('footer.menu.profile')}</span></Link>
                                        </div>
                                    )}
                                </div>
            </div>
        </div>
    )
}

export default Header
