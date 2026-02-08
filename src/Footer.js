import React from "react";
import "./Footer.css";
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from './i18n';
import HomeIcon from '@material-ui/icons/Home';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SearchIcon from '@material-ui/icons/Search';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonIcon from '@material-ui/icons/Person';

function Footer() {
  const { t } = useTranslation();
  const location = useLocation();

  const menu = [
    { to: '/', key: 'footer.menu.home', icon: <HomeIcon /> },
    { to: '/orders', key: 'footer.menu.orders', icon: <ReceiptIcon /> },
    { to: '/search', key: 'footer.menu.search', icon: <SearchIcon /> },
    { to: '/visited', key: 'footer.menu.visited', icon: <VisibilityIcon /> },
    { to: '/profile', key: 'footer.menu.profile', icon: <PersonIcon /> }
  ];

  return (
    <>
      <div className="footer desktop-footer">
        <p>{t('footer.credit')}</p>
        <p>{t('footer.links')}</p>
      </div>

      {/* Mobile bottom nav */}
      <nav className="bottom-nav" role="navigation" aria-label="main navigation">
        {menu.map((item) => {
          const active = location.pathname === item.to || (item.to === '/' && location.pathname === '/');
          return (
            <Link to={item.to} key={item.key} className={`bottom-nav__item ${active ? 'active' : ''}`}>
              <div className="bottom-nav__icon">{item.icon}</div>
              <div className="bottom-nav__label">{t(item.key)}</div>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

export default Footer;
