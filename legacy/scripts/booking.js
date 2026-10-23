import kosts from './data.js';

const kostListEl = document.getElementById('kost-list');
const searchInput = document.getElementById('search-kost');
const emptyState = document.getElementById('empty-state');
const selectedPreview = document.getElementById('selected-preview');
const bookingForm = document.getElementById('booking-form');

const previewImg = document.getElementById('preview-img');
const previewName = document.getElementById('preview-name');
const previewPrice = document.getElementById('preview-price');
const previewAddress = document.getElementById('preview-address');

let selectedKost = null;

// Populate list
function renderKostList(filter = '') {
    const filtered = kosts.filter(k => k.name.toLowerCase().includes(filter.toLowerCase()));

    kostListEl.innerHTML = filtered.map(k => `
        <div class="kost-item-select ${selectedKost?.id === k.id ? 'active' : ''}" onclick="selectKost('${k.id}')">
            <img src="${k.image}" class="kost-thumb-small" loading="lazy">
            <div>
                <div style="font-weight: 600; font-size: 0.9rem;">${k.name}</div>
                <div style="font-size: 0.8rem; color: var(--text-secondary);">${k.price}</div>
            </div>
        </div>
    `).join('');
}

// Select integration
window.selectKost = (id) => {
    selectedKost = kosts.find(k => k.id === id);
    if (!selectedKost) return;

    // Update UI
    emptyState.style.display = 'none';
    selectedPreview.style.display = 'flex';
    bookingForm.style.display = 'block';

    previewImg.src = selectedKost.image;
    previewName.innerText = selectedKost.name;
    previewPrice.innerText = selectedKost.price;
    previewAddress.innerText = selectedKost.address;

    // Refresh list to show active state
    renderKostList(searchInput.value);
};

// Search handler
searchInput.addEventListener('input', (e) => {
    renderKostList(e.target.value);
});

// Form handler
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!selectedKost) return;

    const inputs = e.target.elements;
    const name = inputs[0].value;
    const date = inputs[2].value;
    const duration = inputs[3].value;

    const message = `Halo, saya ${name}. Saya ingin booking *${selectedKost.name}* untuk tanggal ${date} selama ${duration} bulan. Apakah masih tersedia?`;

    // Redirect to WA owner if contact exists, else generic
    let phone = '628981548999'; // Default admin
    if (selectedKost.contact && selectedKost.contact !== '-') {
        phone = selectedKost.contact.replace(/\D/g, '');
        if (phone.startsWith('0')) phone = '62' + phone.substring(1);
    }

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
});

// Initial load
renderKostList();
