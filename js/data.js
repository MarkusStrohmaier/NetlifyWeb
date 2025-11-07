const dates = [
  { id: 1, date: '2025-05-18', time: '19:30', title: 'Premiere: Das verlorene Bühnenlicht', location: 'Stadttheater Graz, Kleiner Saal', tickets: 'Restkarten' },
  { id: 2, date: '2025-05-19', time: '18:00', title: 'Das verlorene Bühnenlicht', location: 'Stadttheater Graz, Kleiner Saal', tickets: 'Ausverkauft' },
  { id: 3, date: '2025-05-25', time: '20:00', title: 'Gala-Abend: 50 Jahre Theaterverein', location: 'Kulturzentrum Wien-Landstraße', tickets: 'Tickets verfügbar' },
  { id: 4, date: '2025-06-01', time: '17:00', title: 'Kindertheater: Der sprechende Vorhang', location: 'Vereinssaal Musterspiel', tickets: 'Tickets verfügbar' },
];

const galleryAlbums = [
  {
    id: 'buehnenlicht',
    title: 'Das verlorene Bühnenlicht (2025)',
    cover: 'images/image.png',
    description: 'Eindrücke unserer neuesten Produktion, ein fesselndes Drama mit starken Charakteren.',
    images: [
      { src: 'images/image.png', alt: 'Bühnenbild Akt 1' },
      { src: 'https://placehold.co/800x1200/darkblue900/cyan400?text=Elvira+Szene', alt: 'Szene mit Elvira' },
      { src: 'https://placehold.co/1000x700/darkblue700/light100?text=Ensemble+Szene', alt: 'Ensemble auf der Bühne' },
      { src: 'https://placehold.co/900x600/darkblue800/cyan500?text=Schlussapplaus', alt: 'Schlussapplaus des Ensembles' },
    ]
  },
  // ... weitere Alben ...
];
