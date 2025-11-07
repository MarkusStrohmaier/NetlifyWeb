// === DATENMODELLE FÜR DYNAMISCHE INHALTE ===

// Simuliertes Datenmodell für Termine
const dates = [
    { id: 1, date: '2025-05-18', time: '19:30', title: 'Premiere: Das verlorene Bühnenlicht', location: 'Stadttheater Graz, Kleiner Saal', tickets: 'Restkarten' },
    { id: 2, date: '2025-05-19', time: '18:00', title: 'Das verlorene Bühnenlicht', location: 'Stadttheater Graz, Kleiner Saal', tickets: 'Ausverkauft' },
    { id: 3, date: '2025-05-25', time: '20:00', title: 'Gala-Abend: 50 Jahre Theaterverein', location: 'Kulturzentrum Wien-Landstraße', tickets: 'Tickets verfügbar' },
    { id: 4, date: '2025-06-01', time: '17:00', title: 'Kindertheater: Der sprechende Vorhang', location: 'Vereinssaal Musterspiel', tickets: 'Tickets verfügbar' },
];

// DATENMODELL FÜR ALBUM-GALERIE
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
    { 
        id: 'sommernacht', 
        title: 'Ein Sommernachtstraum (2023)', 
        cover: 'https://placehold.co/800x600/cyan600/darkblue900?text=Cover:+Sommernachtstraum', 
        description: 'Ein magisches Spektakel unter freiem Himmel, unvergessliche Momente.', 
        images: [
            { src: 'https://placehold.co/1200x800/cyan700/darkblue900?text=Feenwald', alt: 'Feen im Wald' },
            { src: 'https://placehold.co/800x1200/cyan500/darkblue800?text=Liebespaar', alt: 'Liebespaar Szene' },
            { src: 'https://placehold.co/1000x700/cyan400/light100?text=Lustige+Handwerker', alt: 'Die lustigen Handwerker' },
        ]
    },
    { 
        id: 'vereinsfest', 
        title: 'Jahresfest & Proben (2024)', 
        cover: 'https://placehold.co/800x600/darkblue700/light200?text=Cover:+Vereinsfest', 
        description: 'Blicke hinter die Kulissen: Probenarbeit, Vereinsleben und gesellige Stunden.', 
        images: [
            { src: 'https://placehold.co/1200x800/darkblue600/light100?text=Probenarbeit', alt: 'Probenarbeit' },
            { src: 'https://placehold.co/800x1200/darkblue500/light50?text=Technikcheck', alt: 'Technik-Check' },
            { src: 'https://placehold.co/1000x700/darkblue400/cyan500?text=Gemeinschaft', alt: 'Gemeinschaftsessen' },
        ]
    }
];

// DATENMODELL FÜR ENSEMBLE
const ensembleMembers = [
    { name: 'Dr. Marlene Steiner', role: 'Intendantin & Regie', bio: 'Seit 20 Jahren die kreative Leitung des Vereins. Herz und Seele des Ensembles.', img: 'https://placehold.co/100x100/cyan900/light50?text=MS' },
    { name: 'Johannes Berger', role: 'Obmann & Schauspieler', bio: 'Verantwortlich für die Vereinsführung und glänzt in Hauptrollen.', img: 'https://placehold.co/100x100/darkblue700/cyan500?text=JB' },
    { name: 'Sophie Gruber', role: 'Kostüm & Maske', bio: 'Meisterin der Verwandlung. Jedes Kostüm ein Kunstwerk.', img: 'https://placehold.co/100x100/cyan700/light50?text=SG' },
    { name: 'Michael Koch', role: 'Bühnenbild & Technik', bio: 'Sorgt für Licht, Ton und die perfekte Kulisse.', img: 'https://placehold.co/100x100/darkblue900/cyan500?text=MK' },
];