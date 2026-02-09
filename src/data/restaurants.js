const restaurants = [
  // Restaurante
  {
    id: 101,
    name: 'La Esquina del Sabor',
    category: 'Restaurante',
    tags: ['carnes', 'saludable'],
    rating: 4.6,
    priceRange: '$$ · Moderado',
    pricePerPerson: 30,
    description: 'Cocina local con énfasis en carnes y opciones saludables.',
    hours: 'Lun-Sab 11:00 - 23:00',
    address: { address: 'Av. Principal, 12', city: 'Caracas', state: 'Distrito Capital' },
    cover: '/images/restaurants/101.avif'
  },
  {
    id: 102,
    name: 'Mar y Tierra',
    category: 'Restaurante',
    tags: ['carnes', 'sin gluten'],
    rating: 4.4,
    priceRange: '$$$ · Alto',
    pricePerPerson: 45,
    description: 'Mariscos y cortes selectos en ambiente elegante.',
    hours: 'Mar-Dom 12:00 - 22:30',
    address: { address: 'C.C. Central, Local 5', city: 'Caracas', state: 'Distrito Capital' },
    cover: '/images/restaurants/102.avif'
  },
  {
    id: 103,
    name: 'Sabor y Tradición',
    category: 'Restaurante',
    tags: ['arepera', 'organico'],
    rating: 4.2,
    priceRange: '$ · Económico',
    pricePerPerson: 20,
    description: 'Recetas tradicionales con ingredientes orgánicos.',
    hours: 'Todos los días 8:00 - 22:00',
    address: { address: 'Calle 7, Esquina', city: 'Caracas', state: 'Distrito Capital' },
    cover: '/images/restaurants/103.avif'
  },

  // Café
  {
    id: 201,
    name: 'Café Central',
    category: 'Café',
    tags: ['saludable', 'organico'],
    rating: 4.1,
    priceRange: '$ · Económico',
    pricePerPerson: 12,
    description: 'Cafetería con granos locales y pastelería artesanal.',
    hours: 'Lun-Dom 7:00 - 20:00',
    address: { address: 'Plaza Café, Pb', city: 'Caracas', state: 'Distrito Capital' },
    cover: '/images/restaurants/201.avif'
  },
  {
    id: 202,
    name: 'Tostado',
    category: 'Café',
    tags: ['sin gluten', 'saludable'],
    rating: 4.0,
    priceRange: '$ · Económico',
    pricePerPerson: 10,
    description: 'Especialistas en cafés filtrados y opciones sin gluten.',
    hours: 'Mar-Dom 8:00 - 18:00',
    address: { address: 'Av. Café 45', city: 'Caracas', state: 'Distrito Capital' },
    cover: '/images/restaurants/202.avif'
  },
  {
    id: 203,
    name: 'Rincón Espresso',
    category: 'Café',
    tags: ['organico'],
    rating: 4.3,
    priceRange: '$ · Económico',
    pricePerPerson: 15,
    description: 'Pequeño café especializado en espresso y brunch.',
    hours: 'Todos los días 7:30 - 16:30',
    address: { address: 'Boulevard 3', city: 'Caracas', state: 'Distrito Capital' },
    cover: '/images/restaurants/203.avif'
  },

  // Familiar
  {
    id: 301,
    name: 'Casa Familiar',
    category: 'Familiar',
    tags: ['arepera', 'saludable'],
    rating: 4.0,
    priceRange: '$ · Económico',
    pricePerPerson: 14,
    description: 'Ambiente familiar y platos para niños.',
    hours: 'Lun-Dom 9:00 - 22:00',
    address: { address: 'Urbanización Las Flores', city: 'Caracas', state: 'Distrito Capital' },
    cover: '/images/restaurants/301.avif'
  },
  {
    id: 302,
    name: 'El Patio',
    category: 'Familiar',
    tags: ['carnes', 'sushi'],
    rating: 4.2,
    priceRange: '$$ · Moderado',
    pricePerPerson: 28,
    description: 'Comida variada ideal para familias numerosas.',
    hours: 'Todos los días 10:00 - 23:00',
    address: { address: 'Centro Comercial Patio', city: 'Caracas', state: 'Distrito Capital' },
    cover: '/images/restaurants/302.avif'
  },
  {
    id: 303,
    name: 'La Casa de Mamá',
    category: 'Familiar',
    tags: ['arepera', 'organico'],
    rating: 3.9,
    priceRange: '$ · Económico',
    pricePerPerson: 13,
    description: 'Comidas caseras y porciones generosas.',
    hours: 'Lun-Sab 8:00 - 20:00',
    address: { address: 'Av. Principal 77', city: 'Caracas', state: 'Distrito Capital' },
    cover: '/images/restaurants/303.avif'
  },

  // Evento
  {
    id: 401,
    name: 'Salón Eventos Caracas',
    category: 'Evento',
    tags: ['organico'],
    rating: 4.5,
    priceRange: '$$$ · Alto',
    pricePerPerson: 60,
    description: 'Espacio para eventos, banquetes y celebraciones.',
    hours: 'Bajo reserva',
    address: { address: 'Av. Los Próceres', city: 'Caracas', state: 'Distrito Capital' },
    cover: '/images/restaurants/401.avif'
  },
  {
    id: 402,
    name: 'Eventos y Co.',
    category: 'Evento',
    tags: ['saludable'],
    rating: 4.0,
    priceRange: '$$$ · Alto',
    pricePerPerson: 55,
    description: 'Organización y catering para eventos corporativos.',
    hours: 'Bajo reserva',
    address: { address: 'Edificio Central Piso 10', city: 'Caracas', state: 'Distrito Capital' },
    cover: '/images/restaurants/402.avif'
  },
  {
    id: 403,
    name: 'Espacio Celebrar',
    category: 'Evento',
    tags: ['sin gluten'],
    rating: 4.2,
    priceRange: '$$$ · Alto',
    pricePerPerson: 65,
    description: 'Salón elegante con menús personalizados.',
    hours: 'Bajo reserva',
    address: { address: 'Km 4 Carretera', city: 'Caracas', state: 'Distrito Capital' },
    cover: '/images/restaurants/403.avif'
  },

  // Salón
  {
    id: 501,
    name: 'Salón Belleza & Café',
    category: 'Salón',
    tags: ['organico', 'saludable'],
    rating: 4.1,
    priceRange: '$$ · Moderado',
    pricePerPerson: 25,
    description: 'Salón con servicio de comida ligera y productos orgánicos.',
    hours: 'Mar-Dom 9:00 - 19:00',
    address: { address: 'C.C. Salón, Local 2', city: 'Caracas', state: 'Distrito Capital' },
    cover: '/images/restaurants/501.avif'
  },
  {
    id: 502,
    name: 'Studio Spa',
    category: 'Salón',
    tags: ['sin gluten'],
    rating: 4.3,
    priceRange: '$$$ · Alto',
    pricePerPerson: 58,
    description: 'Salón y spa con menú saludable para acompañar tratamientos.',
    hours: 'Lun-Sab 10:00 - 20:00',
    address: { address: 'Zona Rosa', city: 'Caracas', state: 'Distrito Capital' },
    cover: '/images/restaurants/502.avif'
  },
  {
    id: 503,
    name: 'Peluquería Moderna',
    category: 'Salón',
    tags: ['saludable'],
    rating: 3.9,
    priceRange: '$ · Económico',
    pricePerPerson: 9,
    description: 'Servicio rápido con opciones de snack saludables.',
    hours: 'Lun-Vie 9:00 - 18:00',
    address: { address: 'Av. Estilo 21', city: 'Caracas', state: 'Distrito Capital' },
    cover: '/images/restaurants/503.avif'
  }
]

export default restaurants
