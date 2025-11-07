// Globale Zustandsvariablen
let currentPage = 'Home'; 
let currentAlbum = null; 

// --- WICHTIG: Die Datenmodelle (dates, galleryAlbums, ensembleMembers) werden aus data.js geladen ---

/**
 * Simuliert das Laden von Inhalten für jede Seite.
 * @param {string} page Der Name der zu ladenden Seite.
 * @param {string} [albumId=null] Optional: Die ID eines Albums, das in der Galerie geöffnet werden soll.
 */
function renderPage(page, albumId = null) {
    currentPage = page;
    const contentArea = document.getElementById('content-area');
    const navLinks = document.querySelectorAll('.nav-link');
    let contentHTML = '';

    // Markiere den aktiven Navigationslink
    navLinks.forEach(link => {
        if (link.dataset.page === page) {
            // Active Link Style (Cyan Text, Cyan Border)
            link.classList.add('font-bold', 'text-cyan-400', 'border-b-2', 'border-cyan-500');
            link.classList.remove('text-light-100');
        } else {
            // Inactive Link Style (Light Text)
            link.classList.remove('font-bold', 'text-cyan-400', 'border-b-2', 'border-cyan-500');
            link.classList.add('text-light-100');
        }
    });

    // Setze den Seitentitel (für SEO/UX)
    document.title = `Theaterverein Musterspiel - ${page === 'UeberUns' ? 'Über Uns' : page}`;

    switch (page) {
        case 'Home': contentHTML = renderHome(); break;
        case 'Termine': contentHTML = renderTermine(); break;
        case 'Galerie':
            if (albumId) {
                currentAlbum = galleryAlbums.find(album => album.id === albumId);
                contentHTML = renderAlbum(currentAlbum);
            } else {
                currentAlbum = null; // Zurück zur Albumübersicht
                contentHTML = renderGalerieOverview();
            }
            break;
        case 'UeberUns': contentHTML = renderUeberUns(); break;
        case 'Kontakt': contentHTML = renderKontakt(); break;
        default: contentHTML = `<div class="p-8 text-center text-light-100 serif text-xl">Seite nicht gefunden.</div>`;
    }

    contentArea.innerHTML = contentHTML;
    window.scrollTo(0, 0); // Scrolle nach oben beim Seitenwechsel

    // Füge spezifische Event Listener nach dem Rendern hinzu (z.B. für die Galerie-Lightbox)
    if (page === 'Galerie' && currentAlbum) {
        // Verzögere die Listener-Zuweisung kurz, um sicherzustellen, dass das DOM vollständig gerendert ist
        setTimeout(attachAlbumImageListeners, 50);
    }
}

// === RENDER FUNKTIONEN FÜR SEITEN ===
function renderHome() {
    return `
    <section class="serif bg-darkblue-800 text-light-50 py-16 md:py-24 shadow-2xl">
        <div class="container mx-auto px-6 max-w-7xl">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h1 class="text-5xl md:text-7xl font-bold mb-4 text-cyan-400 leading-tight"> Die Bühne ruft. </h1>
                    <p class="text-xl md:text-2xl mb-8 text-light-100"> Willkommen beim Theaterverein Musterspiel, dem Herzen der österreichischen Laien-Theaterkultur seit 1970. Erleben Sie uns live! </p>
                    <a onclick="renderPage('Termine')" class="inline-block px-8 py-3 bg-cyan-500 text-darkblue-900 text-lg font-semibold rounded-lg shadow-lg hover:bg-cyan-400 transition cursor-pointer"> Nächste Termine entdecken &rarr; </a>
                </div>
                <div class="rounded-lg overflow-hidden shadow-2xl transform hover:scale-[1.01] transition duration-500">
                    <img src="https://placehold.co/800x550/darkblue950/cyan500?text=Theaterb%C3%BChne+|+Hero" alt="Bühnenszene" class="w-full h-auto object-cover">
                </div>
            </div>
        </div>
    </section>
    <section class="sans bg-darkblue-950 py-16">
        <div class="container mx-auto px-6 max-w-7xl">
            <h2 class="serif text-4xl font-bold text-center mb-12 text-light-50 border-b-2 border-cyan-400 pb-3 inline-block mx-auto"> Aktuelles Stück: Das verlorene Bühnenlicht </h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="md:col-span-2">
                    <p class="text-lg text-light-200 mb-6">
                        <span class="font-bold text-cyan-400">Premiere:</span> 18. Mai 2025. Das verlorene Bühnenlicht ist ein fesselndes Drama über die Tücken des Ruhms und die Suche nach Authentizität. Die Geschichte spielt im Wien der 1920er Jahre und folgt der jungen Schauspielerin Elvira, die zwischen ihren Träumen und den Erwartungen des strengen Theaterdirektors zerrieben wird.
                    </p>
                    <ul class="list-disc list-inside space-y-2 text-light-100">
                        <li><i class="fas fa-calendar-alt text-cyan-500 w-5"></i> <span class="font-semibold">Nächste Vorstellung:</span> 19. Mai, 18:00 Uhr</li>
                        <li><i class="fas fa-map-marker-alt text-cyan-500 w-5"></i> <span class="font-semibold">Spielort:</span> Stadttheater Graz, Kleiner Saal</li>
                        <li><i class="fas fa-user-circle text-cyan-500 w-5"></i> <span class="font-semibold">Regie:</span> Dr. Marlene Steiner</li>
                    </ul>
                    <button onclick="renderPage('Termine')" class="mt-8 px-6 py-2 bg-cyan-700 text-light-50 rounded-full hover:bg-cyan-600 transition shadow-md"> Alle Termine ansehen </button>
                </div>
                <div class="md:col-span-1">
                    <img src="https://placehold.co/400x500/darkblue900/cyan500?text=St%C3%BCckplakat" alt="Plakat des aktuellen Stücks" class="w-full h-auto rounded-lg shadow-xl">
                </div>
            </div>
        </div>
    </section>
    `;
}

function renderTermine() {
    const today = new Date();
    const formatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const listItems = dates.map(date => {
        const eventDate = new Date(date.date);
        const isPast = eventDate < today;
        const statusClass = date.tickets === 'Ausverkauft' ? 'bg-cyan-900 text-cyan-300' : date.tickets.includes('verfügbar') ? 'bg-cyan-500 text-darkblue-900' : 'bg-cyan-700 text-light-50';

        return `
        <div class="p-6 bg-darkblue-900 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 flex flex-col md:flex-row items-start md:items-center justify-between border-l-4 border-cyan-500 ${isPast ? 'opacity-50' : ''}">
            <div class="mb-4 md:mb-0 md:flex-grow">
                <p class="text-sm font-semibold uppercase text-cyan-400 sans"> ${eventDate.toLocaleDateString('de-AT', formatOptions)} </p>
                <h3 class="serif text-2xl font-bold text-light-50 mb-1"> ${date.title} </h3>
                <p class="text-light-200 sans"> <i class="far fa-clock mr-2 text-cyan-500"></i>${date.time} Uhr | <i class="fas fa-map-pin ml-3 mr-2 text-cyan-500"></i>${date.location} </p>
            </div>
            <div class="flex-shrink-0">
                <span class="px-4 py-2 text-sm font-bold rounded-full ${statusClass}"> ${isPast ? 'Vergangen' : date.tickets} </span>
            </div>
        </div>
        `;
    }).join('');

    return `
    <section class="py-16 bg-darkblue-950">
        <div class="container mx-auto px-6 max-w-7xl">
            <h2 class="serif text-5xl font-bold text-center mb-4 text-light-50"> Spielplan & Termine </h2>
            <p class="text-center text-xl mb-12 text-light-200 sans"> Hier finden Sie alle unsere kommenden Vorstellungen. Sichern Sie sich rechtzeitig Ihre Karten! </p>
            <div class="space-y-6"> ${listItems} </div>
            <div class="mt-12 p-4 bg-darkblue-800 border-l-4 border-cyan-500 text-light-100 sans rounded-lg">
                <i class="fas fa-info-circle mr-2"></i> Hinweis: Neue Termine können einfach im JavaScript-Array <code>dates</code> in <code>data.js</code> hinzugefügt werden.
            </div>
        </div>
    </section>
    `;
}

// Rendert die Album-Übersicht der Galerie
function renderGalerieOverview() {
    const albumGrid = galleryAlbums.map(album =>
        `<div onclick="renderPage('Galerie', '${album.id}')" class="album-cover relative overflow-hidden rounded-xl shadow-lg group cursor-pointer transform hover:scale-[1.03] transition duration-500 border border-darkblue-700">
            <img src="${album.cover}" alt="Album Cover: ${album.title}" class="w-full h-72 object-cover transition duration-300 group-hover:opacity-60">
            <div class="absolute inset-0 bg-darkblue-900 bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <span class="text-light-50 text-xl font-bold serif p-4 border-2 border-cyan-500 rounded-lg text-center">
                    ${album.title} <br> <i class="fas fa-images text-lg mt-2"></i>
                </span>
            </div>
        </div>`
    ).join('');

    return `
    <section class="py-16 bg-darkblue-950">
        <div class="container mx-auto px-6 max-w-7xl">
            <h2 class="serif text-5xl font-bold text-center mb-4 text-light-50"> Unsere Bildergalerie </h2>
            <p class="text-center text-xl mb-12 text-light-200 sans"> Wählen Sie ein Stück oder Event, um die Fotos anzusehen. </p>
            <div id="album-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${albumGrid}
            </div>
        </div>
    </section>
    `;
}

// Rendert die Bilder eines spezifischen Albums
function renderAlbum(album) {
    if (!album) {
        return `<div class="p-8 text-center text-light-100 serif text-xl">Album nicht gefunden.</div>`;
    }

    // Fügt einen data-src und data-alt Attribut zum Klick-Element hinzu
    const imageGrid = album.images.map(img =>
        `<div class="album-image relative overflow-hidden rounded-xl shadow-lg group cursor-pointer transform hover:scale-[1.03] transition duration-500" data-src="${img.src}" data-alt="${img.alt}">
            <img src="${img.src}" alt="${img.alt}" class="w-full h-64 object-cover transition duration-300 group-hover:opacity-80">
            <div class="absolute inset-0 bg-darkblue-900 bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <span class="text-light-50 text-lg font-bold serif p-2"> ${img.alt} </span>
            </div>
        </div>`
    ).join('');

    return `
    <section class="py-16 bg-darkblue-950">
        <div class="container mx-auto px-6 max-w-7xl">
            <button onclick="renderPage('Galerie')" class="mb-8 px-4 py-2 bg-cyan-700 text-light-50 rounded-full hover:bg-cyan-600 transition shadow-md"> &larr; Zurück zur Album-Übersicht </button>
            <h2 class="serif text-5xl font-bold text-center mb-4 text-light-50"> ${album.title} </h2>
            <p class="text-center text-xl mb-12 text-light-200 sans"> ${album.description} </p>
            <div id="album-image-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                ${imageGrid}
            </div>
        </div>
    </section>
    `;
}

function renderUeberUns() {
    const ensembleHTML = ensembleMembers.map(member =>
        `<div class="bg-darkblue-900 p-6 rounded-lg shadow-md flex flex-col items-center text-center border-t-4 border-cyan-500 hover:shadow-xl transition duration-300">
            <img src="${member.img}" alt="${member.name}" class="w-24 h-24 rounded-full mb-4 object-cover border-4 border-cyan-700">
            <h3 class="serif text-xl font-bold text-light-50">${member.name}</h3>
            <p class="text-cyan-400 font-semibold sans text-sm mb-3">${member.role}</p>
            <p class="text-light-200 sans text-sm">${member.bio}</p>
        </div>`
    ).join('');

    return `
    <section class="py-16 bg-darkblue-950">
        <div class="container mx-auto px-6 max-w-7xl">
            <h2 class="serif text-5xl font-bold text-center mb-16 text-light-50"> Über Uns: Tradition und Leidenschaft </h2>
            <div class="grid md:grid-cols-2 gap-12 mb-16 text-light-200">
                <div>
                    <h3 class="serif text-3xl font-bold text-cyan-400 mb-4">Unsere Geschichte</h3>
                    <p class="sans leading-relaxed"> Der Theaterverein Musterspiel wurde 1970 von einer Gruppe leidenschaftlicher Theaterliebhaber in Graz gegründet. Seit über 50 Jahren bringen wir klassische Stücke und moderne Dramen auf die Bühnen Österreichs. Unser Ziel ist es, die Laienspielkultur zu fördern und Menschen jeden Alters für das Theater zu begeistern. Jedes Jahr inszenieren wir zwei große Produktionen, die oft regionale Bezüge haben. </p>
                </div>
                <div>
                    <h3 class="serif text-3xl font-bold text-cyan-400 mb-4">Unser Vereinszweck</h3>
                    <p class="sans leading-relaxed"> Laut unseren Statuten dient der Verein ausschließlich gemeinnützigen Zwecken zur Förderung der Kunst und Kultur. Wir bieten Probenmöglichkeiten, Schauspielunterricht und technische Workshops für unsere Mitglieder. Darüber hinaus pflegen wir den Austausch mit anderen Kulturvereinen in der Steiermark und ganz Österreich. Wir sind im zentralen Vereinsregister (ZVR) unter der Nummer XXXXXXXX eingetragen. </p>
                </div>
            </div>
            <h3 class="serif text-4xl font-bold text-center text-light-50 mb-10 border-b-2 border-cyan-500 pb-2"> Das Ensemble und Team </h3>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                ${ensembleHTML}
            </div>
        </div>
    </section>
    `;
}

function renderKontakt() {
    return `
    <section class="py-16 bg-darkblue-950">
        <div class="container mx-auto px-6 max-w-7xl">
            <h2 class="serif text-5xl font-bold text-center mb-12 text-light-50"> Kontakt & Impressum </h2>
            <div class="grid md:grid-cols-2 gap-12">
                <div class="p-8 bg-darkblue-900 rounded-lg shadow-xl border-t-4 border-cyan-500">
                    <h3 class="serif text-2xl font-bold text-cyan-400 mb-6">Senden Sie uns eine Nachricht</h3>
                    <form onsubmit="event.preventDefault(); showContactMessage();" class="space-y-4 sans">
                        <div>
                            <label for="name" class="block text-sm font-medium text-light-200">Name</label>
                            <input type="text" id="name" name="name" class="mt-1 block w-full rounded-md border-darkblue-700 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-darkblue-800 text-light-50 p-2" required>
                        </div>
                        <div>
                            <label for="email" class="block text-sm font-medium text-light-200">E-Mail</label>
                            <input type="email" id="email" name="email" class="mt-1 block w-full rounded-md border-darkblue-700 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-darkblue-800 text-light-50 p-2" required>
                        </div>
                        <div>
                            <label for="message" class="block text-sm font-medium text-light-200">Nachricht</label>
                            <textarea id="message" name="message" rows="4" class="mt-1 block w-full rounded-md border-darkblue-700 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 bg-darkblue-800 text-light-50 p-2" required></textarea>
                        </div>
                        <button type="submit" class="w-full px-4 py-2 bg-cyan-700 text-light-50 font-semibold rounded-lg hover:bg-cyan-600 transition shadow-md"> Nachricht absenden </button>
                        <p id="contact-status" class="mt-3 text-center text-cyan-400 font-semibold"></p>
                    </form>
                </div>
                <div class="space-y-8">
                    <div class="p-8 bg-darkblue-800 text-light-50 rounded-lg shadow-xl border-l-4 border-cyan-500">
                        <h3 class="serif text-2xl font-bold text-cyan-400 mb-4">Vereinsadresse Österreich</h3>
                        <address class="not-italic sans space-y-2 text-light-200">
                            <p><i class="fas fa-building mr-3 text-cyan-500"></i> Theaterverein Musterspiel</p>
                            <p><i class="fas fa-road mr-3 text-cyan-500"></i> Theatergasse 17/2</p>
                            <p><i class="fas fa-city mr-3 text-cyan-500"></i> 8010 Graz, Österreich</p>
                            <p><i class="fas fa-envelope mr-3 text-cyan-500"></i> <a href="mailto:kontakt@musterspiel.at" class="hover:text-cyan-300">kontakt@musterspiel.at</a></p>
                            <p><i class="fas fa-phone mr-3 text-cyan-500"></i> +43 (0) 316 / 123 456</p>
                        </address>
                    </div>
                    <div class="p-6 bg-darkblue-900 rounded-lg shadow-md border-l-4 border-cyan-500 sans">
                        <h3 class="serif text-2xl font-bold text-cyan-400 mb-4">Rechtliches</h3>
                        <p class="text-light-200 text-sm"> <span class="font-bold">ZVR-Nummer:</span> XXXXXXXX (Zentrales Vereinsregister)</p>
                        <p class="text-light-200 text-sm mb-4"> <span class="font-bold">Vertretungsberechtigtes Organ:</span> Johannes Berger, Obmann </p>
                        <ul class="space-y-1">
                            <li><a onclick="renderPage('Kontakt')" class="text-cyan-400 hover:text-cyan-500 underline text-sm cursor-pointer">Impressum & Offenlegung nach § 25 MedienG</a></li>
                            <li><a onclick="renderPage('Kontakt')" class="text-cyan-400 hover:text-cyan-500 underline text-sm cursor-pointer">Datenschutzerklärung (DSGVO)</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

function showContactMessage() {
    const statusElement = document.getElementById('contact-status');
    statusElement.textContent = 'Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen!';
    // Formular nach 3 Sekunden zurücksetzen
    setTimeout(() => {
        document.querySelector('form').reset();
        statusElement.textContent = '';
    }, 3000);
}

// === LIGHTBOX LOGIK ===
// Fügt Event Listener für die Bilder im Album (Klick auf Bild) und die Lightbox hinzu
function attachAlbumImageListeners() {
    const albumGrid = document.getElementById('album-image-grid');
    if (albumGrid) {
        // Event Listener für Klick auf das Bild-Element
        albumGrid.addEventListener('click', (e) => {
            // Finde das nächstgelegene Element mit den data-Attributen
            const imageContainer = e.target.closest('.album-image');
            if (imageContainer && imageContainer.dataset.src && imageContainer.dataset.alt) {
                openLightbox(imageContainer.dataset.src, imageContainer.dataset.alt);
            }
        });
    }

    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxCloseButton = document.getElementById('lightbox-close');

    // Schließe Lightbox bei Klick auf Overlay (nur wenn außerhalb des Bildinhalts geklickt wird)
    lightboxOverlay.onclick = function(e) {
        // Überprüfe, ob das geklickte Element exakt das Overlay ist
        if (e.target === this) {
            closeLightbox();
        }
    };

    // Schließe Lightbox bei Klick auf den Button
    lightboxCloseButton.onclick = closeLightbox;
}

function openLightbox(src, alt) {
    const overlay = document.getElementById('lightbox-overlay');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    img.src = src;
    img.alt = alt;
    caption.textContent = alt;
    overlay.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox-overlay').style.display = 'none';
}

// Hinzufügen der Close-Funktion für die Lightbox (für Esc-Taste)
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && document.getElementById('lightbox-overlay').style.display === 'flex') {
        closeLightbox();
    }
});


// === INITIALISIERUNG BEIM LADEN DER SEITE ===
document.addEventListener('DOMContentLoaded', () => {
    renderPage('Home');
});