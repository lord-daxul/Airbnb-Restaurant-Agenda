import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    'header.become_host': 'Become a host',
    'search.placeholder': 'Search',
    'banner.hide': 'Hide',
    'banner.search_dates': 'Search Dates',
    'banner.title': 'Get out and stretch your imagination',
    'banner.subtitle': 'Plan a different kind of getaway to uncover the hidden gems near you.',
    'banner.explore': 'Explore Nearby',
    'home.online_experiences': 'Online Experiences',
    'home.online_experiences_desc': 'Unique activities we can do together, led by a world of hosts.',
    'home.unique_stays': 'Unique stays',
    'home.unique_stays_desc': 'Spaces that are more than just a place to sleep.',
    'home.entire_homes': 'Entire homes',
    'home.entire_homes_desc': 'Comfortable private places, with room for friends or family.',
    'home.listing1.title': '3 Bedroom Flat in Bournemouth',
    'home.listing1.description': 'Superhost with a stunning view of the beachside in Sunny Bournemouth',
    'home.listing1.price': '£130/night',
    'home.listing2.title': 'Penthouse in London',
    'home.listing2.description': 'Enjoy the amazing sights of London with this stunning penthouse',
    'home.listing2.price': '£350/night',
    'home.listing3.title': '1 Bedroom apartment',
    'home.listing3.description': 'Superhost with great amenities and a fabulous shopping complex nearby',
    'home.listing3.price': '£70/night',
    'search.summary': '62 stays · 26 august to 30 august · 2 guest',
    'search.heading': 'Stays nearby',
    'search.filter.cancellation': 'Cancellation Flexibility',
    'search.filter.type': 'Type of place',
    'search.filter.price': 'Price',
    'search.filter.rooms': 'Rooms and beds',
    'search.filter.more': 'More filters',
    'search.guests': 'Number of guests',
    'search.button': 'Search Airbnb',
    'footer.credit': '© 2026 Airbnb clone! Sin derechos reservados Focusdep 2026',
    'footer.links': 'Privacy · Terms · Sitemap · Company Details',
    'listing.1.location': 'Private room in center of London',
    'listing.1.title': 'Stay at this spacious Edwardian House',
    'listing.1.description': '1 guest · 1 bedroom · 1 bed · 1.5 shared bathrooms · Wifi · Kitchen · Free parking · Washing Machine',
    'listing.1.price': '£30 / night',
    'listing.1.total': '£117 total',
    'listing.2.location': 'Private room in center of London',
    'listing.2.title': 'Independant luxury studio apartment',
    'listing.2.description': '2 guest · 3 bedroom · 1 bed · 1.5 shared bathrooms · Wifi · Kitchen',
    'listing.2.price': '£40 / night',
    'listing.2.total': '£157 total',
    'listing.3.location': 'Private room in center of London',
    'listing.3.title': 'London Studio Apartments',
    'listing.3.description': '4 guest · 4 bedroom · 4 bed · 2 bathrooms · Free parking · Washing Machine',
    'listing.3.price': '£35 / night',
    'listing.3.total': '£207 total',
    'listing.4.location': 'Private room in center of London',
    'listing.4.title': '30 mins to Oxford Street, Excel London',
    'listing.4.description': '1 guest · 1 bedroom · 1 bed · 1.5 shared bathrooms · Wifi · Kitchen · Free parking · Washing Machine',
    'listing.4.price': '£55 / night',
    'listing.4.total': '£320 total',
    'listing.5.location': 'Private room in center of London',
    'listing.5.title': 'Spacious Peaceful Modern Bedroom',
    'listing.5.description': '3 guest · 1 bedroom · 1 bed · 1.5 shared bathrooms · Wifi · Free parking · Dry Cleaning',
    'listing.5.price': '£60 / night',
    'listing.5.total': '£450 total',
    'listing.6.location': 'Private room in center of London',
    'listing.6.title': 'The Blue Room In London',
    'listing.6.description': '2 guest · 1 bedroom · 1 bed · 1.5 shared bathrooms · Wifi · Washing Machine',
    'listing.6.price': '£65 / night',
    'listing.6.total': '£480 total',
    'listing.7.location': 'Private room in center of London',
    'listing.7.title': '5 Star Luxury Apartment',
    'listing.7.description': '3 guest · 1 bedroom · 1 bed · 1.5 shared bathrooms · Wifi · Kitchen · Free parking · Washing Machine',
    'listing.7.price': '£90 / night',
    'listing.7.total': '£650 total'
  },
  es: {
    'header.become_host': 'Conviértete en anfitrión',
    'search.placeholder': 'Buscar',
    'banner.hide': 'Ocultar',
    'banner.search_dates': 'Buscar fechas',
    'banner.title': 'Sal y estira tu imaginación',
    'banner.subtitle': 'Planifica una escapada diferente y descubre tesoros cerca de ti.',
    'banner.explore': 'Explorar cercano',
    'home.online_experiences': 'Experiencias en línea',
    'home.online_experiences_desc': 'Actividades únicas que podemos hacer juntos, dirigidas por anfitriones de todo el mundo.',
    'home.unique_stays': 'Estancias únicas',
    'home.unique_stays_desc': 'Lugares que son más que un sitio para dormir.',
    'home.entire_homes': 'Casas completas',
    'home.entire_homes_desc': 'Lugares privados y cómodos, con espacio para amigos o familia.',
    'home.listing1.title': 'Piso de 3 habitaciones en Bournemouth',
    'home.listing1.description': 'Superhost con unas vistas impresionantes de la playa en el soleado Bournemouth',
    'home.listing1.price': '£130/noche',
    'home.listing2.title': 'Ático en Londres',
    'home.listing2.description': 'Disfruta de las increíbles vistas de Londres con este impresionante ático',
    'home.listing2.price': '£350/noche',
    'home.listing3.title': 'Apartamento de 1 habitación',
    'home.listing3.description': 'Superhost con excelentes servicios y un fabuloso centro comercial cerca',
    'home.listing3.price': '£70/noche',
    'search.summary': '62 alojamientos · 26 ago - 30 ago · 2 huéspedes',
    'search.heading': 'Alojamientos cercanos',
    'search.filter.cancellation': 'Flexibilidad de cancelación',
    'search.filter.type': 'Tipo de alojamiento',
    'search.filter.price': 'Precio',
    'search.filter.rooms': 'Habitaciones y camas',
    'search.filter.more': 'Más filtros',
    'search.guests': 'Número de huéspedes',
    'search.button': 'Buscar en Airbnb',
    'footer.credit': '© 2026 ¡Clon de Airbnb! Sin derechos reservados Focusdep 2026',
    'footer.links': 'Privacidad · Términos · Mapa del sitio · Detalles de la empresa',
    'listing.1.location': 'Habitación privada en el centro de Londres',
    'listing.1.title': 'Quédate en esta espaciosa casa eduardiana',
    'listing.1.description': '1 huésped · 1 dormitorio · 1 cama · 1.5 baños compartidos · Wifi · Cocina · Aparcamiento gratis · Lavadora',
    'listing.1.price': '£30 / noche',
    'listing.1.total': '£117 total',
    'listing.2.location': 'Habitación privada en el centro de Londres',
    'listing.2.title': 'Estudio de lujo independiente',
    'listing.2.description': '2 huéspedes · 3 dormitorios · 1 cama · 1.5 baños compartidos · Wifi · Cocina',
    'listing.2.price': '£40 / noche',
    'listing.2.total': '£157 total',
    'listing.3.location': 'Habitación privada en el centro de Londres',
    'listing.3.title': 'Apartamentos estudio de Londres',
    'listing.3.description': '4 huéspedes · 4 dormitorios · 4 camas · 2 baños · Aparcamiento gratis · Lavadora',
    'listing.3.price': '£35 / noche',
    'listing.3.total': '£207 total',
    'listing.4.location': 'Habitación privada en el centro de Londres',
    'listing.4.title': 'A 30 min de Oxford Street, Excel London',
    'listing.4.description': '1 huésped · 1 dormitorio · 1 cama · 1.5 baños compartidos · Wifi · Cocina · Aparcamiento gratis · Lavadora',
    'listing.4.price': '£55 / noche',
    'listing.4.total': '£320 total',
    'listing.5.location': 'Habitación privada en el centro de Londres',
    'listing.5.title': 'Dormitorio espacioso, tranquilo y moderno',
    'listing.5.description': '3 huéspedes · 1 dormitorio · 1 cama · 1.5 baños compartidos · Wifi · Aparcamiento gratis · Tintorería',
    'listing.5.price': '£60 / noche',
    'listing.5.total': '£450 total',
    'listing.6.location': 'Habitación privada en el centro de Londres',
    'listing.6.title': 'La habitación azul en Londres',
    'listing.6.description': '2 huéspedes · 1 dormitorio · 1 cama · 1.5 baños compartidos · Wifi · Lavadora',
    'listing.6.price': '£65 / noche',
    'listing.6.total': '£480 total',
    'listing.7.location': 'Habitación privada en el centro de Londres',
    'listing.7.title': 'Apartamento de lujo 5 estrellas',
    'listing.7.description': '3 huéspedes · 1 dormitorio · 1 cama · 1.5 baños compartidos · Wifi · Cocina · Aparcamiento gratis · Lavadora',
    'listing.7.price': '£90 / noche',
    'listing.7.total': '£650 total'
  }
};

const I18nContext = createContext(null);

export function I18nProvider({ children, defaultLang = 'es' }) {
  const [lang, setLang] = useState(defaultLang);

  function t(key) {
    if (!key) return '';
    return (translations[lang] && translations[lang][key]) || key;
  }

  return (
    <I18nContext.Provider value={{ t, lang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within I18nProvider');
  return ctx;
}

export default I18nContext;
