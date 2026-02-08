import React, { useState } from 'react'
import './Banner.css'
import { Button } from "@material-ui/core";
import Search from './Search';
import { useHistory } from "react-router-dom";
import { useTranslation } from './i18n';

function Banner() {
    const history = useHistory();
    const [showSearch, setShowSearch] = useState(false);

    const { t } = useTranslation();

    return (
        <div className='banner'>
            <div className='banner__search'>
                {showSearch && <Search />}

                <Button onClick={() => setShowSearch(!showSearch)} className='banner__searchButton' variant='outlined'>
                    {showSearch ? t('banner.hide') : t('banner.search_dates')}
                </Button>
            </div>
            <div className='banner__info'>
                <h1>{t('banner.title')}</h1>
                <h5>
                    {t('banner.subtitle')}
                </h5>
                <Button onClick={() => history.push('/search')} variant='outlined'>{t('banner.explore')}</Button>
            </div>
        </div>
    )
}

export default Banner
