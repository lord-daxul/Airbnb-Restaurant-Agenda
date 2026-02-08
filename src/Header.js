import React, { useState, useRef, useEffect } from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useTranslation } from './i18n';
import HomeIcon from '@material-ui/icons/Home';
import ReceiptIcon from '@material-ui/icons/Receipt';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonIcon from '@material-ui/icons/Person';

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
    return (
        <div className='header'>
            <Link to='/'>
                <img
                    className="header__icon"
                    src="https://i.pinimg.com/originals/3c/bf/be/3cbfbe148597341fa56f2f87ade90956.png"
                    alt=""
                />
            </Link>
           
            <div className='header__center'>
                <input type="text" placeholder={t('search.placeholder')} />
                <SearchIcon />
            </div>

            <div className='header__right'>
                <p>{t('header.become_host')}</p>
                <Link to="/register" style={{ textDecoration: 'none', color: 'inherit', margin: '0 8px' }}>
                  <p>Register</p>
                </Link>
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
