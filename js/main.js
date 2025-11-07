// Tailwind-Konfiguration
tailwind.config = {
  theme: {
    extend: {
      colors: {
        darkblue: {
          800: '#151D33',
          900: '#0F1528',
          950: '#0A0E1A',
        },
        cyan: {
          400: '#57E0FF',
          500: '#29D9FF',
          700: '#0891B2',
        },
        light: {
          50: '#F8FAFC',
          200: '#CBD5E1',
        },
      },
    },
  },
};

let currentPage = 'Home';
let currentAlbum = null;

function renderPage(page, albumId = null) {
  currentPage = page;
  const contentArea = document.getElementById('content-area');
  let html = '';

  switch (page) {
    case 'Home': html = renderHome(); break;
    case 'Termine': html = renderTermine(); break;
    case 'Galerie': html = albumId ? renderAlbum(galleryAlbums.find(a => a.id === albumId)) : renderGalerieOverview(); break;
    case 'UeberUns': html = renderUeberUns(); break;
    case 'Kontakt': html = renderKontakt(); break;
    default: html = `<div class="p-8 text-center">Seite nicht gefunden.</div>`;
  }

  contentArea.innerHTML = html;
  if (page === 'Galerie' && albumId) setTimeout(attachAlbumImageListeners, 100);
}

function attachAlbumImageListeners() {
  const grid = document.getElementById('album-image-grid');
  const overlay = document.getElementById('lightbox-overlay');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  const close = document.getElementById('lightbox-close');

  if (!grid) return;
  grid.addEventListener('click', e => {
    const el = e.target.closest('.album-image');
    if (!el) return;
    img.src = el.dataset.src;
    caption.textContent = el.dataset.alt;
    overlay.style.display = 'flex';
  });

  close.onclick = () => overlay.style.display = 'none';
  overlay.onclick = e => { if (e.target === overlay) overlay.style.display = 'none'; };
}

document.addEventListener('DOMContentLoaded', () => renderPage('Home'));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('lightbox-overlay').style.display = 'none';
});
