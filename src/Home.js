import React from 'react';
import './Home.css';
import Banner from './Banner'
import Card from './Card'
import { useTranslation } from './i18n'
import { Link } from 'react-router-dom'

// ES7 snippets to do 'rfce'

function Home() {
    const { t } = useTranslation();
    return (
        <div className='home'>
            <Banner />

            <div className='home__section'>
            <Link to="/category/event" style={{ textDecoration: 'none' }}>
              <Card
                  src="/images/home/eventos.avif"
                  title={'Eventos'}
                  description={t('home.online_experiences_desc')}
              />
            </Link>
            <Link to="/category/restaurant" style={{ textDecoration: 'none' }}>
              <Card
                  src="/images/home/restaurantes_unicos.avif"
                  title={t('home.unique_stays')}
                  description={t('home.unique_stays_desc')}
              />
            </Link>
            <Link to="/category/cafe" style={{ textDecoration: 'none' }}>
              <Card
                  src="/images/home/cafes.avif"
                  title={'Cafés'}
                  description={t('home.entire_homes_desc')}
              />
            </Link>
            </div>
            <div className='home__section'>
            <Link to="/restaurant/101" style={{ textDecoration: 'none' }}>
              <Card
                  src="https://media.nomadicmatt.com/2019/airbnb_breakup3.jpg"
                  title={'La Esquina del Sabor'}
                  description={'Cocina local con énfasis en carnes y opciones saludables.'}
                  price={'$$'}
              />
            </Link>
            <Link to="/restaurant/102" style={{ textDecoration: 'none' }}>
              <Card
                  src="https://thespaces.com/wp-content/uploads/2017/08/Courtesy-of-Airbnb.jpg"
                  title={'Mar y Tierra'}
                  description={'Mariscos y cortes selectos en ambiente elegante.'}
                  price={'$$$'}
              />
            </Link>
            <Link to="/restaurant/103" style={{ textDecoration: 'none' }}>
              <Card
                  src="https://media.nomadicmatt.com/2018/apartment.jpg"
                  title={'Sabor y Tradición'}
                  description={'Recetas tradicionales con ingredientes orgánicos.'}
                  price={'$'}
              />
            </Link>
            </div>
        </div>
    )
}

export default Home
