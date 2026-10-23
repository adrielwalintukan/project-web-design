import kosts from './data.js';

const kostContainer = document.getElementById('kost-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Function to create HTML for a single kost card
function createKostCard(kost) {
    const typeClass = kost.type.toLowerCase().includes('pria') ? 'pria' : 'wanita';

    return `
        <div class="kost-card" onclick="window.location.href='${kost.link}'">
            <div class="card-image-wrapper">
                <img src="${kost.image}" alt="${kost.name}" loading="lazy">
                <span class="card-badge ${typeClass}">${kost.type}</span>
            </div>
            <div class="card-body">
                <div class="card-title">${kost.name}</div>
                <div class="card-location">
                    <i class="fas fa-map-marker-alt" style="color: var(--primary-color); margin-top:3px;"></i>
                    <span>${kost.address}</span>
                </div>
                <div class="card-price">${kost.price}</div>
                <div class="card-features">
                    <span class="feature-tag"><i class="fas fa-ruler-combined"></i> ${kost.size}</span>
                    <span class="feature-tag"><i class="fas fa-check-circle"></i> Ter-Approve</span>
                </div>
            </div>
        </div>
    `;
}

// Function to render kosts
function renderKosts(data) {
    kostContainer.innerHTML = '';

    if (data.length === 0) {
        kostContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                <h3>Kost tidak ditemukan</h3>
                <p>Coba kata kunci lain.</p>
            </div>
        `;
        return;
    }

    const cardsHtml = data.map(kost => createKostCard(kost)).join('');
    kostContainer.innerHTML = cardsHtml;
}

// Initial render
renderKosts(kosts);

// Search functionality
function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const filteredKosts = kosts.filter(kost =>
        kost.name.toLowerCase().includes(query) ||
        kost.address.toLowerCase().includes(query) ||
        kost.type.toLowerCase().includes(query)
    );
    renderKosts(filteredKosts);
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleSearch();
});

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    } else {
        // Real-time search (optional, remove if not desired)
        handleSearch();
    }
});
