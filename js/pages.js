/* ===========================================
   PAGES.JS
   Enthält alle Renderfunktionen für die Website
   =========================================== */

// 🏠 Startseite
function renderHome() {
  return `
    <section class="py-16 bg-darkblue-950">
      <div class="container mx-auto px-6 max-w-7xl text-center">
        <h1 class="serif text-5xl font-bold text-cyan-400 mb-6">Willkommen beim Theaterverein Musterspiel</h1>
        <p class="text-light-200 text-lg max-w-2xl mx-auto leading-relaxed">
          Leidenschaft, Emotion und Gemeinschaft – seit über 50 Jahren steht unser Verein für kreative Theaterkunst und
          unvergessliche Abende. Tauchen Sie ein in unsere Welt der Bühne!
        </p>
        <div class="mt-10">
          <button onclick="renderPage('Termine')" class="bg-cyan-500 hover:bg-cyan-400 text-darkblue-950 font-semibold px-8 py-3 rounded-2xl transition">
            Zu den nächsten Aufführungen
          </button>
        </div>
      </div>
    </section>

    <section class="py-20 bg-darkblue-900">
      <div class="container mx-auto px-6 max-w-6xl grid md:grid-cols-3 gap-10 text-center">
        <div class="p-6 rounded-2xl bg-darkblue-800 shadow-md hover:shadow-xl transition">
          <i class="fas fa-theater-masks text-cyan-400 text-5xl mb-4"></i>
          <h3 class="serif text-xl font-semibold text-light-50 mb-2">Vielfältiges Repertoire</h3>
          <p class="text-light-200 text-sm">Von Klassikern bis zu modernen Stücken – unser Spielplan bietet für jeden Geschmack etwas.</p>
        </div>
        <div class="p-6 rounded-2xl bg-darkblue-800 shadow-md hover:shadow-xl transition">
          <i class="fas fa-users text-cyan-400 text-5xl mb-4"></i>
          <h3 class="serif text-xl font-semibold text-light-50 mb-2">Engagierte Mitglieder</h3>
          <p class="text-light-200 text-sm">Unser Verein besteht aus Menschen, die mit Herzblut und Leidenschaft Theater leben.</p>
        </div>
        <div class="p-6 rounded-2xl bg-darkblue-800 shadow-md hover:shadow-xl transition">
          <i class="fas fa-star text-cyan-400 text-5xl mb-4"></i>
          <h3 class="serif text-xl font-semibold text-light-50 mb-2">50 Jahre Theatertradition</h3>
          <p class="text-light-200 text-sm">Wir feiern ein halbes Jahrhundert voller Kultur, Kreativität und Applaus.</p>
        </div>
      </div>
    </section>
  `;
}

// 🎭 Termine
function renderTermine() {
  return `
    <section class="py-16 bg-darkblue-950">
      <div class="container mx-auto px-6 max-w-6xl">
        <h2 class="serif text-4xl font-bold text-cyan-400 mb-10 text-center">Unsere Aufführungstermine</h2>
        <div class="space-y-6">
          ${dates.map(d => `
            <div class="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-darkblue-800 shadow-lg border border-darkblue-700">
              <div>
                <h3 class="text-light-50 font-semibold text-xl mb-2">${d.title}</h3>
                <p class="text-light-200">${new Date(d.date).toLocaleDateString('de-DE')} • ${d.time} Uhr</p>
                <p class="text-light-200 text-sm mt-1">${d.location}</p>
              </div>
              <div class="mt-4 md:mt-0">
                <span class="text-cyan-400 font-semibold">${d.tickets}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// 📸 Galerie – Übersicht
function renderGalerieOverview() {
  return `
    <section class="py-16 bg-darkblue-950">
      <div class="container mx-auto px-6 max-w-7xl">
        <h2 class="serif text-4xl font-bold text-cyan-400 mb-12 text-center">Galerie</h2>
        <div class="grid md:grid-cols-3 sm:grid-cols-2 gap-8">
          ${galleryAlbums.map(album => `
            <div onclick="renderPage('Galerie', '${album.id}')" class="cursor-pointer group bg-darkblue-900 rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition transform hover:scale-105">
              <img src="${album.cover}" alt="${album.title}" class="w-full h-60 object-cover group-hover:opacity-80 transition">
              <div class="p-5">
                <h3 class="serif text-xl font-semibold text-light-50 mb-1">${album.title}</h3>
                <p class="text-light-200 text-sm">${album.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// 🖼️ Galerie – Albumansicht
function renderAlbum(album) {
  if (!album) return `<div class="p-8 text-center text-light-200">Album nicht gefunden.</div>`;
  return `
    <section class="py-16 bg-darkblue-950">
      <div class="container mx-auto px-6 max-w-7xl">
        <button onclick="renderPage('Galerie')" class="text-cyan-400 hover:underline mb-6 inline-block"><i class="fas fa-arrow-left mr-2"></i>Zurück zur Galerie</button>
        <h2 class="serif text-4xl font-bold text-cyan-400 mb-8 text-center">${album.title}</h2>
        <p class="text-light-200 text-center mb-10 max-w-2xl mx-auto">${album.description}</p>
        <div id="album-image-grid" class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          ${album.images.map(img => `
            <div class="album-image cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition group" data-src="${img.src}" data-alt="${img.alt}">
              <img src="${img.src}" alt="${img.alt}" class="object-cover w-full h-60 group-hover:scale-105 transition duration-300">
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// 👥 Über Uns
function renderUeberUns() {
  return `
    <section class="py-16 bg-darkblue-950">
      <div class="container mx-auto px-6 max-w-5xl text-center">
        <h2 class="serif text-4xl font-bold text-cyan-400 mb-8">Über Uns</h2>
        <p class="text-light-200 max-w-2xl mx-auto leading-relaxed mb-8">
          Der Theaterverein Musterspiel wurde 1975 gegründet und zählt heute über 60 aktive Mitglieder – Schauspieler:innen, Regisseur:innen,
          Bühnenbauer:innen und Technikbegeisterte. Unser Ziel ist es, Theaterkunst mit Leidenschaft zu leben und das Publikum zu begeistern.
        </p>
        <div class="grid md:grid-cols-3 gap-8 mt-12">
          <div class="p-6 bg-darkblue-900 rounded-2xl shadow-md">
            <i class="fas fa-user-tie text-cyan-400 text-4xl mb-3"></i>
            <h4 class="serif text-xl font-semibold text-light-50">Vorstand</h4>
            <p class="text-light-200 text-sm">Leitung & Organisation – das Herzstück des Vereinslebens.</p>
          </div>
          <div class="p-6 bg-darkblue-900 rounded-2xl shadow-md">
            <i class="fas fa-people-group text-cyan-400 text-4xl mb-3"></i>
            <h4 class="serif text-xl font-semibold text-light-50">Mitglieder</h4>
            <p class="text-light-200 text-sm">Engagierte Theaterliebhaber:innen, die jedes Stück zum Leben erwecken.</p>
          </div>
          <div class="p-6 bg-darkblue-900 rounded-2xl shadow-md">
            <i class="fas fa-handshake text-cyan-400 text-4xl mb-3"></i>
            <h4 class="serif text-xl font-semibold text-light-50">Kooperationen</h4>
            <p class="text-light-200 text-sm">Zusammenarbeit mit Schulen, Kulturzentren und Gemeinden in der Region.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ✉️ Kontakt
function renderKontakt() {
  return `
    <section class="py-16 bg-darkblue-950">
      <div class="container mx-auto px-6 max-w-4xl text-center">
        <h2 class="serif text-4xl font-bold text-cyan-400 mb-8">Kontakt</h2>
        <p class="text-light-200 mb-10 max-w-2xl mx-auto">
          Sie möchten mehr über uns erfahren oder Mitglied werden? Wir freuen uns über Ihre Nachricht!
        </p>
        <form onsubmit="event.preventDefault(); alert('Nachricht gesendet!');" class="bg-darkblue-900 p-8 rounded-2xl shadow-lg text-left">
          <div class="mb-4">
            <label class="block text-light-200 mb-1">Name</label>
            <input type="text" required class="w-full p-3 rounded-md bg-darkblue-800 border border-darkblue-700 text-light-50 focus:ring-2 focus:ring-cyan-500 outline-none">
          </div>
          <div class="mb-4">
            <label class="block text-light-200 mb-1">E-Mail</label>
            <input type="email" required class="w-full p-3 rounded-md bg-darkblue-800 border border-darkblue-700 text-light-50 focus:ring-2 focus:ring-cyan-500 outline-none">
          </div>
          <div class="mb-6">
            <label class="block text-light-200 mb-1">Nachricht</label>
            <textarea rows="5" required class="w-full p-3 rounded-md bg-darkblue-800 border border-darkblue-700 text-light-50 focus:ring-2 focus:ring-cyan-500 outline-none"></textarea>
          </div>
          <button type="submit" class="bg-cyan-500 hover:bg-cyan-400 text-darkblue-950 font-semibold px-8 py-3 rounded-2xl transition">
            Nachricht senden
          </button>
        </form>
      </div>
    </section>
  `;
}
