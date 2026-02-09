import React from 'react'
import './Banner.css'
import { Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { useTranslation } from './i18n';

function Banner() {
    const history = useHistory();
    const { t } = useTranslation();

    return (
        <div className='banner'>
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
