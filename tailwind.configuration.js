// === TAILWIND KONFIGURATION FÜR FARBEN (DARK MODE) ===
tailwind.config = {
    theme: {
        extend: {
            colors: {
                // Neue Dark-Mode Basis (Anthrazit/Tiefblau)
                darkblue: {
                    '50': '#EBF2FF', '100': '#D4E2FF', '200': '#A2BFFF', '300': '#719CFF', '400': '#4079FF',
                    '500': '#0F56FF', '600': '#0D4BEB', '700': '#0A3DA8',
                    '800': '#151D33', // Header/Footer/Dark Surfaces
                    '900': '#0F1528',
                    '950': '#0A0E1A', // Main Background
                },
                // Akzentfarbe (Modernes Cyan)
                cyan: {
                    '50': '#F0FBFF', '100': '#E0F7FF', '200': '#B3F0FF', '300': '#85E8FF', '400': '#57E0FF',
                    '500': '#29D9FF', // Primäre Akzentfarbe (Mittelton)
                    '600': '#06B6D4',
                    '700': '#0891B2', // Dunkleres Cyan (Text)
                    '800': '#077391', '900': '#065570', '950': '#04364A',
                },
                // Helle Textfarbe (als Ersatz für Cream)
                light: {
                    '50': '#F8FAFC', // Main Text Color
                    '100': '#E2E8F0',
                    '200': '#CBD5E1',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            }
        }
    }
}