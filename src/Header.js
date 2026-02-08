import React from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useTranslation } from './i18n';

function Header() {
    const { t, lang, setLang } = useTranslation();
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
                <Avatar />
            </div>
        </div>
    )
}

export default Header
