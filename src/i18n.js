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
    'home.listing1.price': '$130/meal',
    'home.listing2.title': 'Rooftop Restaurant in Caracas',
    'home.listing2.description': 'Enjoy panoramic Ávila views with a curated tasting menu',
    'home.listing2.price': '$350/meal',
    'home.listing3.title': 'Intimate Café & Brunch Spot',
    'home.listing3.description': 'Popular local café with specialty coffees and all-day brunch',
    'home.listing3.price': '$70/meal',
    'search.summary': '62 restaurants · 26 august to 30 august · 2 diners',
    'search.heading': 'Restaurants nearby',
    'search.filter.cancellation': 'Cancellation Flexibility',
    'search.filter.type': 'Type of restaurant',
    'search.filter.price': 'Price',
    'search.filter.rooms': 'Tables and seats',
    'search.filter.more': 'More filters',
    'search.guests': 'Number of diners',
    'search.button': 'Search restaurants',
    'footer.credit': '© 2026 Airbnb clone! No rights reserved focusdevp 2026',
    'footer.links': 'Privacy · Terms · Sitemap · Company Details',
    'listing.1.location': 'Seaside, Bournemouth',
    'listing.1.title': 'Seaside Bistro — Fresh Seafood Menu',
    'listing.1.description': 'Terrace seating · Seasonal seafood · Reservations recommended · Free parking nearby',
    'listing.1.price': '$30 / person',
    'listing.1.total': '$117 total (estimate for 4)',
    'listing.2.location': 'Altamira, Caracas',
    'listing.2.title': 'Independent Luxury Rooftop Restaurant',
    'listing.2.description': 'Tasting menu · 3 courses · Great skyline views · Reservation required',
    'listing.2.price': '$40 / person',
    'listing.2.total': '$157 total (estimate for 4)',
    'listing.3.location': 'Las Mercedes, Caracas',
    'listing.3.title': 'Trendy Café & Brunch Spot',
    'listing.3.description': 'All-day brunch · Specialty coffee · Vegan options',
    'listing.3.price': '$35 / person',
    'listing.3.total': '$207 total (estimate for 6)',
    'listing.4.location': 'Near Sambil, Caracas',
    'listing.4.title': 'Casual Dining near Oxford Street',
    'listing.4.description': 'Quick bites · Group-friendly · Good for families',
    'listing.4.price': '$55 / person',
    'listing.4.total': '$320 total (estimate for 6)',
    'listing.5.location': 'Central Caracas',
    'listing.5.title': 'Spacious Modern Restaurant',
    'listing.5.description': 'Private dining rooms · Group menus · Dry cleaning and coat check',
    'listing.5.price': '$60 / person',
    'listing.5.total': '$450 total (estimate for 8)',
    'listing.6.location': 'El Hatillo, Caracas',
    'listing.6.title': 'The Blue Room — Café & Wine Bar',
    'listing.6.description': 'Cozy evening spot · Small plates · Wine selection',
    'listing.6.price': '$65 / person',
    'listing.6.total': '$480 total (estimate for 6)',
    'listing.7.location': 'Sabana Grande, Caracas',
    'listing.7.title': '5-Star Fine Dining Experience',
    'listing.7.description': 'Chef’s tasting menu · Wine pairings · Private service',
    'listing.7.price': '$90 / person',
    'listing.7.total': '$650 total (estimate for 8)'
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
    'home.unique_stays': 'Restaurantes únicos',
    'home.unique_stays_desc': 'Restaurantes y cafés que ofrecen comidas memorables y ambientes especiales.',
    'home.entire_homes': 'Restaurantes y Cafés',
    'home.entire_homes_desc': 'Espacios privados para comer, menús de degustación y cafeterías acogedoras para grupos y amigos.',
    'home.listing1.title': 'Bistró junto al mar en Bournemouth',
    'home.listing1.description': 'Bistró acogedor con vistas al mar y carta de temporada',
    'home.listing1.price': '$130/por persona',
    'home.listing2.title': 'Restaurante en la azotea de Caracas',
    'home.listing2.description': 'Disfruta de vistas panorámicas del Ávila con un menú de degustación',
    'home.listing2.price': '$350/por persona',
    'home.listing3.title': 'Cafetería íntima y brunch',
    'home.listing3.description': 'Cafetería popular con cafés especiales y brunch todo el día',
    'home.listing3.price': '$70/por persona',
    'search.summary': '62 restaurantes · 26 ago - 30 ago · 2 comensales',
    'search.heading': 'Restaurantes cercanos',
    'search.filter.cancellation': 'Flexibilidad de cancelación',
    'search.filter.type': 'Tipo de restaurante',
    'search.filter.price': 'Precio',
    'search.filter.rooms': 'Mesas y asientos',
    'search.filter.more': 'Más filtros',
    'search.guests': 'Número de comensales',
    'search.button': 'Buscar restaurantes',
    'footer.credit': '© 2026 ¡Clon de Airbnb! Sin derechos reservados focusdevp 2026',
    'footer.links': 'Privacidad · Términos · Mapa del sitio · Detalles de la empresa',
    'listing.1.location': 'Frente al mar, Bournemouth',
    'listing.1.title': 'Bistró frente al mar — Carta de temporada',
    'listing.1.description': 'Terraza · Mariscos de temporada · Reservas recomendadas · Aparcamiento cercano',
    'listing.1.price': '$30 / persona',
    'listing.1.total': '$117 total (estimado para 4)',
    'listing.2.location': 'Altamira, Caracas',
    'listing.2.title': 'Restaurante de lujo en la azotea',
    'listing.2.description': 'Menú de degustación · 3 platos · Vistas panorámicas · Reserva necesaria',
    'listing.2.price': '$40 / persona',
    'listing.2.total': '$157 total (estimado para 4)',
    'listing.3.location': 'Las Mercedes, Caracas',
    'listing.3.title': 'Cafetería trendy y brunch',
    'listing.3.description': 'Brunch todo el día · Café especialidad · Opciones veganas',
    'listing.3.price': '$35 / persona',
    'listing.3.total': '$207 total (estimado para 6)',
    'listing.4.location': 'Cerca del Sambil, Caracas',
    'listing.4.title': 'Comida casual cerca de Oxford Street',
    'listing.4.description': 'Bocadillos rápidos · Ideal para grupos · Familiar',
    'listing.4.price': '$55 / persona',
    'listing.4.total': '$320 total (estimado para 6)',
    'listing.5.location': 'Centro de Caracas',
    'listing.5.title': 'Restaurante moderno y espacioso',
    'listing.5.description': 'Salas privadas · Menús para grupos · Guardarropa disponible',
    'listing.5.price': '$60 / persona',
    'listing.5.total': '$450 total (estimado para 8)',
    'listing.6.location': 'El Hatillo, Caracas',
    'listing.6.title': 'The Blue Room — Café y wine bar',
    'listing.6.description': 'Lugar acogedor · Tapas y selección de vinos',
    'listing.6.price': '$65 / persona',
    'listing.6.total': '$480 total (estimado para 6)',
    'listing.7.location': 'Sabana Grande, Caracas',
    'listing.7.title': 'Experiencia gastronómica 5 estrellas',
    'listing.7.description': 'Menú degustación del chef · Maridaje de vinos · Servicio privado',
    'listing.7.price': '$90 / persona',
    'listing.7.total': '$650 total (estimado para 8)'
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
