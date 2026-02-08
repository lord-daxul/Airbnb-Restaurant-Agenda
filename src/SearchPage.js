import React from 'react';
import './SearchPage.css';
import { Button } from "@material-ui/core";
import SearchResult from "./SearchResult";
import { useTranslation } from './i18n';

function SearchPage() {
    const { t } = useTranslation();
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
            <SearchResult
                img="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_wbPYTxQPMcBh7SPzLFActXnP3uhifeVT_g&usqp=CAU"
                location={t('listing.1.location')}
                title={t('listing.1.title')}
                description={t('listing.1.description')}
                star={4.73}
                price={t('listing.1.price')}
                total={t('listing.1.total')}
            />

            <SearchResult
                img="https://www.expatkings.com/wp-content/uploads/2018/10/Airbnb-rental-tips.-Hostmaker-1-620x349.jpg"
                location={t('listing.2.location')}
                title={t('listing.2.title')}
                description={t('listing.2.description')}
                star={4.3}
                price={t('listing.2.price')}
                total={t('listing.2.total')}
            />

            <SearchResult
                img="https://www.smartertravel.com/uploads/2017/07/Untitled-design-8.jpg"
                location={t('listing.3.location')}
                title={t('listing.3.title')}
                description={t('listing.3.description')}
                star={3.8}
                price={t('listing.3.price')}
                total={t('listing.3.total')}
            />
            <SearchResult
                img="https://cdn.bisnow.net/fit?height=489&type=jpeg&url=https%3A%2F%2Fs3.amazonaws.com%2Fcdn.bisnow.net%2Fcontent%2Fimages%2F2017%2F05%2F59151d0978bbf_https_press_atairbnb_com_app_uploads_2016_12_midtown_4.jpeg&width=717&sign=FeltIPi9cOWA36nVIeDvZxwgtiCZrpUyMRdvyZviTUI"
                location={t('listing.4.location')}
                title={t('listing.4.title')}
                description={t('listing.4.description')}
                star={4.1}
                price={t('listing.4.price')}
                total={t('listing.4.total')}
            />
            <SearchResult
                img="https://media.cntraveler.com/photos/5a8f258bd363c34048b35aac/master/w_2250,h_1500,c_limit/airbnb-plus-london.jpg"
                location={t('listing.5.location')}
                title={t('listing.5.title')}
                description={t('listing.5.description')}
                star={5.0}
                price={t('listing.5.price')}
                total={t('listing.5.total')}
            />
            <SearchResult
                img="https://static.trip101.com/paragraph_media/pictures/001/676/061/large/969ae4bb-efd1-4fb9-a4e3-5cb3316dd3c9.jpg?1562227937"
                location={t('listing.6.location')}
                title={t('listing.6.title')}
                description={t('listing.6.description')}
                star={4.23}
                price={t('listing.6.price')}
                total={t('listing.6.total')}
            />
            <SearchResult
                img="https://image.insider.com/585029a0dd0895bc548b4b8b?width=750&format=jpeg&auto=webp"
                location={t('listing.7.location')}
                title={t('listing.7.title')}
                description={t('listing.7.description')}
                star={3.85}
                price={t('listing.7.price')}
                total={t('listing.7.total')}
            />
        </div>
    )
}

export default SearchPage
