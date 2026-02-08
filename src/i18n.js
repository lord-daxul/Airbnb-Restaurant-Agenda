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
    'home.unique_stays': 'Unique dining',
    'home.unique_stays_desc': 'Restaurants and cafes that offer memorable meals and atmospheres.',
    'home.entire_homes': 'Restaurants & Cafés',
    'home.entire_homes_desc': 'Private dining spaces, tasting menus, and cosy cafés for groups and friends.',
    'home.listing1.title': 'Seaside Bistro in Bournemouth',
    'home.listing1.description': 'Cozy bistro with sea views and a seasonal menu',
    'home.listing1.price': '£130/meal',
    'home.listing2.title': 'Rooftop Restaurant in London',
    'home.listing2.description': 'Enjoy panoramic London views with a curated tasting menu',
    'home.listing2.price': '£350/meal',
    'home.listing3.title': 'Intimate Café & Brunch Spot',
    'home.listing3.description': 'Popular local café with specialty coffees and all-day brunch',
    'home.listing3.price': '£70/meal',
    'search.summary': '62 stays · 26 august to 30 august · 2 guest',
    'search.heading': 'Stays nearby',
    'search.filter.cancellation': 'Cancellation Flexibility',
    'search.filter.type': 'Type of place',
    'search.filter.price': 'Price',
    'search.filter.rooms': 'Rooms and beds',
    'search.filter.more': 'More filters',
    'search.guests': 'Number of guests',
    'search.button': 'Search Airbnb',
    'footer.credit': '© 2026 Airbnb clone! No rights reserved focusdevp 2026',
    'footer.links': 'Privacy · Terms · Sitemap · Company Details',
    'listing.1.location': 'Seaside, Bournemouth',
    'listing.1.title': 'Seaside Bistro — Fresh Seafood Menu',
    'listing.1.description': 'Terrace seating · Seasonal seafood · Reservations recommended · Free parking nearby',
    'listing.1.price': '£30 / person',
    'listing.1.total': '£117 total (estimate for 4)',
    'listing.2.location': 'Soho, London',
    'listing.2.title': 'Independent Luxury Rooftop Restaurant',
    'listing.2.description': 'Tasting menu · 3 courses · Great skyline views · Reservation required',
    'listing.2.price': '£40 / person',
    'listing.2.total': '£157 total (estimate for 4)',
    'listing.3.location': 'Shoreditch, London',
    'listing.3.title': 'Trendy Café & Brunch Spot',
    'listing.3.description': 'All-day brunch · Specialty coffee · Vegan options',
    'listing.3.price': '£35 / person',
    'listing.3.total': '£207 total (estimate for 6)',
    'listing.4.location': 'Near Oxford Street, London',
    'listing.4.title': 'Casual Dining near Oxford Street',
    'listing.4.description': 'Quick bites · Group-friendly · Good for families',
    'listing.4.price': '£55 / person',
    'listing.4.total': '£320 total (estimate for 6)',
    'listing.5.location': 'Central London',
    'listing.5.title': 'Spacious Modern Restaurant',
    'listing.5.description': 'Private dining rooms · Group menus · Dry cleaning and coat check',
    'listing.5.price': '£60 / person',
    'listing.5.total': '£450 total (estimate for 8)',
    'listing.6.location': 'Central London',
    'listing.6.title': 'The Blue Room — Café & Wine Bar',
    'listing.6.description': 'Cozy evening spot · Small plates · Wine selection',
    'listing.6.price': '£65 / person',
    'listing.6.total': '£480 total (estimate for 6)',
    'listing.7.location': 'Westminster, London',
    'listing.7.title': '5-Star Fine Dining Experience',
    'listing.7.description': 'Chef’s tasting menu · Wine pairings · Private service',
    'listing.7.price': '£90 / person',
    'listing.7.total': '£650 total (estimate for 8)'
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
    'footer.credit': '© 2026 ¡Clon de Airbnb! Sin derechos reservados focusdevp 2026',
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
