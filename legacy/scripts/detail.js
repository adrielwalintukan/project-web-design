import kosts from './data.js';

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const facilityIcons = {
    "Wi-Fi Gratis": "fas fa-wifi",
    "Kamar Mandi Dalam": "fas fa-bath",
    "AC": "fas fa-snowflake",
    "Dapur Bersama": "fas fa-utensils",
    "Keamanan 24 Jam": "fas fa-shield-alt",
    "Kasur": "fas fa-bed",
    "Lemari": "fas fa-door-closed",
    "Meja": "fas fa-table",
    "Kursi": "fas fa-chair",
    "TV": "fas fa-tv",
    "Dapur": "fas fa-utensils",
    "Kulkas Bersama": "fas fa-temperature-low",
    "Tempat Tidur": "fas fa-bed"
};

function renderDetail(kost) {
    // Basic Info
    document.getElementById('kost-name').innerText = kost.name;
    document.getElementById('kost-price').innerText = kost.price;
    document.getElementById('kost-type').innerText = kost.type;
    document.getElementById('kost-size').innerText = kost.size;
    document.getElementById('kost-address').innerText = kost.address;

    // Map
    const mapFrame = document.getElementById('map-frame');
    if (kost.mapUrl && kost.mapUrl !== '-') {
        mapFrame.src = kost.mapUrl;
    } else {
        mapFrame.parentElement.innerHTML = '<p style="color: var(--text-secondary);">Peta tidak tersedia.</p>';
    }

    // Images
    const mainImg = document.getElementById('main-img');
    const thumbList = document.getElementById('thumb-list');

    // Set initial main image
    if (kost.images && kost.images.length > 0) {
        mainImg.src = kost.images[0];

        // Generate thumbnails
        thumbList.innerHTML = kost.images.map((img, index) => `
            <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeImage('${img}', this)">
                <img src="${img}" alt="Thumbnail">
            </div>
        `).join('');
    } else {
        mainImg.src = kost.image; // Fallback
    }

    // Facilities
    const facilityGrid = document.getElementById('facility-grid');
    if (kost.facilities && kost.facilities.length > 0) {
        facilityGrid.innerHTML = kost.facilities.map(fac => {
            const icon = facilityIcons[fac] || 'fas fa-check-circle';
            return `<div class="facility-item"><i class="${icon}"></i> ${fac}</div>`;
        }).join('');
    } else {
        facilityGrid.innerHTML = '<p>Tidak ada data fasilitas.</p>';
    }

    // Contact Button
    const btnWa = document.getElementById('btn-wa');
    if (kost.contact && kost.contact !== '-') {
        // Format number for WA (remove non-digits, ensure 62 prefix)
        let phone = kost.contact.replace(/\D/g, '');
        if (phone.startsWith('0')) phone = '62' + phone.substring(1);
        btnWa.href = `https://wa.me/${phone}?text=Halo, saya tertarik dengan ${kost.name}`;
    } else {
        btnWa.style.display = 'none'; // Hide if no contact
    }
}

// Global function for thumbnail click
window.changeImage = (src, el) => {
    document.getElementById('main-img').src = src;
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
};

// Initial Load
window.onload = () => {
    const kostId = getQueryParameter('kost');
    const kost = kosts.find(k => k.id === kostId);

    if (kost) {
        document.title = `${kost.name} - KostFinder`;
        renderDetail(kost);
    } else {
        document.body.innerHTML = '<div class="container" style="text-align:center; padding-top:100px;"><h1>Kost tidak ditemukan</h1><a href="index.html">Kembali</a></div>';
    }
};
