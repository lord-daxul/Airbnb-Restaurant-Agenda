import React from 'react';
import './Home.css';
import Banner from './Banner'
import Card from './Card'
import { useTranslation } from './i18n'

// ES7 snippets to do 'rfce'

function Home() {
    const { t } = useTranslation();
    return (
        <div className='home'>
            <Banner />

            <div className='home__section'>
            <Card
                src="https://a0.muscache.com/im/pictures/eb9c7c6a-ee33-414a-b1ba-14e8860d59b3.jpg?im_w=720"
                title={t('home.online_experiences')}
                description={t('home.online_experiences_desc')}
            />
            <Card
                src="https://a0.muscache.com/im/pictures/15159c9c-9cf1-400e-b809-4e13f286fa38.jpg?im_w=720"
                title={t('home.unique_stays')}
                description={t('home.unique_stays_desc')}
            />
            <Card
                src="https://a0.muscache.com/im/pictures/fdb46962-10c1-45fc-a228-d0b055411448.jpg?im_w=720"
                title={t('home.entire_homes')}
                description={t('home.entire_homes_desc')}
            />
            </div>
            <div className='home__section'>
            <Card
                src="https://media.nomadicmatt.com/2019/airbnb_breakup3.jpg"
                title={t('home.listing1.title')}
                description={t('home.listing1.description')}
                price={t('home.listing1.price')}
            />
            <Card
                src="https://thespaces.com/wp-content/uploads/2017/08/Courtesy-of-Airbnb.jpg"
                title={t('home.listing2.title')}
                description={t('home.listing2.description')}
                price={t('home.listing2.price')}
            />
            <Card
                src="https://media.nomadicmatt.com/2018/apartment.jpg"
                title={t('home.listing3.title')}
                description={t('home.listing3.description')}
                price={t('home.listing3.price')}
            />
            </div>
        </div>
    )
}

export default Home
