let selectedKost = {};

// Tampilkan daftar kost saat tombol "Pilih Kos" diklik
document.getElementById('selectKostButton').onclick = function () {
    document.getElementById('kostList').style.display = 'block';
};

// Fungsi untuk memilih kost dan mengupdate tampilan
function selectKost(name, location, price, gender, image, kostId) {
    selectedKost = { name, location, price, gender, image, kostId };
    document.getElementById('kostName').innerText = name;
    document.getElementById('kostLocation').innerText = location;
    document.getElementById('kostPrice').innerText = price;
    document.getElementById('kostGender').innerText = gender;

    const kostImage = document.getElementById('kostImage');
    kostImage.src = image;
    kostImage.style.display = 'block';

    document.getElementById('kostList').style.display = 'none';
    document.getElementById('detailKostLink').style.display = 'block';
}

// Fungsi untuk pergi ke detail kost
function goToDetailKost() {
    if (selectedKost.kostId) { // Pastikan kostId ada
        const queryString = `?kost=${encodeURIComponent(selectedKost.kostId)}`;
        window.location.href = `detailkost.html${queryString}`;
    } else {
        alert("Kost tidak ditemukan. Silakan pilih kost terlebih dahulu.");
    }
}

// Fungsi untuk memfilter daftar kost berdasarkan input pencarian
function filterKost() {
    const input = document.getElementById('searchKost');
    const filter = input.value.toLowerCase();
    const kostItems = document.getElementsByClassName('kost-item');

    Array.from(kostItems).forEach(item => {
        if (item.innerText.toLowerCase().includes(filter)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}


// Data User yang Booking Kost
document.getElementById('booking-button').addEventListener('click', function() {
    // Mengambil data dari input
    const namaLengkap = document.getElementById('namaLengkap').value;
    const jenisKelamin = document.getElementById('jenisKelamin').value;
    const noHandphone = document.getElementById('noHandphone').value;
    const email = document.getElementById('email').value;
    const tanggalMasuk = document.getElementById('tanggalMasuk').value;

    // Menampilkan data di konsol
    console.log("Data yang Dikirim:");
    console.log(`Nama Lengkap: ${namaLengkap}`);
    console.log(`Jenis Kelamin: ${jenisKelamin}`);
    console.log(`No Handphone: ${noHandphone}`);
    console.log(`Email: ${email}`);
    console.log(`Tanggal Masuk: ${tanggalMasuk}`);

    // Menampilkan informasi kost yang dibooking
    const bookingMessage = `Booking telah terkirim untuk ${selectedKost.name} di ${selectedKost.location}.`;
    document.getElementById('bookingMessage').innerText = bookingMessage;
    document.getElementById('bookingMessage').style.display = 'block';

    // Menampilkan informasi kost yang dibooking di konsol
    console.log(`Kost yang dibooking: ${selectedKost.name}, Lokasi: ${selectedKost.location}`);

    // Mengosongkan input setelah pengiriman
    document.getElementById('namaLengkap').value = '';
    document.getElementById('jenisKelamin').value = '';
    document.getElementById('noHandphone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('tanggalMasuk').value = '';
});