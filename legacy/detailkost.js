function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function showDetails(kostId) {
    let name, address, price, type, images, facilities, contact, mapUrl;

    switch (kostId) {
        case 'kostWullur':
            name = "KOST WULLUR";
            address = "CX8Q+434, Airmadidi Atas, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara";
            price = "Rp. 300.000 / Bulan";
            type = "Kost Pria";
            images = ["gambar/kostWullur1.jpg", "gambar/kostWullur2.jpg"];
            facilities = ["Wi-Fi Gratis", "Kamar Mandi Dalam", "AC", "Dapur Bersama", "Keamanan 24 Jam"];
            contact = "0812-3456-7890";
            mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.6012168604943!2d124.98512437477766!3d1.4152587985714082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870f006f0eac51%3A0xc261f9a65490b598!2sKos%20wulur!5e0!3m2!1sen!2sid!4v1731417652688!5m2!1sen!2sid";
            break;
        case 'kostMizpa':
            name = "KOST MIZPA";
            address = "CX9Q+337, Airmadidi Atas, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara";
            price = "Rp. 300.000 / Bulan";
            type = "Kost Pria";
            images = ["gambar/kostMizpa.png"];
            facilities = ["Wi-Fi Gratis", "Kamar Mandi Dalam", "AC", "Dapur Bersama", "Keamanan 24 Jam"];
            contact = "0813-4567-8901";
            mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.597067546435!2d124.98510567477776!3d1.4176692985689678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870ee6970c56fb%3A0x1e52d0f891278f42!2sMizpa%20kost!5e0!3m2!1sen!2sid!4v173 1417968295!5m2!1sen!2sid";
            break;
        case 'cornerResidence':
            name = "CORNER RESIDENCE";
            address = " CX8P+FHM, Airmadidi Atas, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara";
            price = "Rp. 850.000 / Bulan";
            type = "Kost Wanita";
            images = ["gambar/cornerResidence1.jpg", "gambar/cornerResidence2.jpg", "gambar/cornerResidence3.jpg"];
            facilities = ["Kasur", "Lemari", "Meja", "Kursi", "AC", "TV"];
            contact = "0812-4244-2527";
            mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.599579323055!2d124.98383257477768!3d1.4162105985704314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870ee5cc9b4173%3A0xdec00ed212e1827!2sCorner%20Residence!5e0!3m2!1sen!2sid!4v1731482600276!5m2!1sen!2sid";
            break;
        case 'kostMaringka':
            name = "KOST MARINGKA";
            address = "CX9Q+337, Airmadidi Atas, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara";
            price = "Rp. 300.000 / Bulan";
            type = "Kost Pria";
            images = ["gambar/kostMaringka1.jpg", "gambar/kostMaringka2.jpg"];
            facilities = ["Wi-Fi Gratis", "Kamar Mandi Dalam", "AC", "Dapur Bersama", "Keamanan 24 Jam"];
            contact = "0853-9936-4308";
            mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.6014867595723!2d124.98518277447191!3d1.4151018613636706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870f160aa39463%3A0x55f915bf5a033aff!2sKos%20MARINGKA!5e0!3m2!1sen!2sid!4v1731848302667!5m2!1sen!2sid";
            break;
        case 'anugerahWisma':
            name = "ANUGERAH WISMA";
            address = "Airmadidi Atas, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara";
            price = "Rp. 700.000 / Bulan";
            type = "Kost Wanita";
            images = ["gambar/anugerahWisma.jpg"];
            facilities = ["Kamar Mandi Dalam", "Dapur", "Meja", "Lemari"];
            contact = "0821-9143-3152";
            mapUrl = "-";
            break;
        case 'kostKainde':
            name = "KOST KAINDE";
            address = "Airmadidi Atas, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara";
            price = "Rp. 375.000 / Bulan";
            type = "Kost Wanita";
            images = ["gambar/kostKainde.jpg"];
            facilities = ["Dapur", "Kasur", "Lemari"];
            contact = "-";
            mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127634.75853938416!2d124.90238407977841!3d1.4239608319565271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870fe8771f1fc9%3A0x7e83781ad77b9a8!2sKost%20Kainde!5e0!3m2!1sen!2sid!4v1731483272636!5m2!1sen!2sid";
            break;
        case 'kostAJ1':
            name = "KOST AJ 1";
            address = "Lingkungan 11, Airmadidi Atas, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara";
            price = "Rp. 500.000 / Bulan";
            type = "Kost Wanita";
            images = ["gambar/kostAJ1-1.jpg", "gambar/kostAJ1-2.jpg"];
            facilities = ["Kamar Mandi Dalam", "Kasur", "Meja", "Lemari"];
            contact = "0813-1044-9264";
            mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.598127105785!2d124.98487707477763!3d1.4170541485695927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870fff6f4321e7%3A0x864424f4afce6bd2!2sA%26J%20Kost%201%20Airmadidi!5e0!3m2!1sen!2sid!4v1731483477476!5m2!1sen!2sid";
            break;
        case 'topasPlace':
            name = "TOPAZ PLACE";
            address = "Lingkungan X, Airmadidi Atas, Airmadidi, North Minahasa Regency, North Sulawesi";
            price = "Rp. 1.000.000 / Bulan";
            type = "Kost Wanita";
            images = ["gambar/topasPlace1.png", "gambar/topasPlace2.png"];
            facilities = ["Tempat Tidur", "Meja", "Lemari", "Kamar Mandi Dalam", "Dapur Bersama", "Kulkas Bersama", "AC"];
            contact = "0852-5638-4914 ";
            mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5975719319235!2d124.9868489!3d1.4173765000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870fe6f81e59ad%3A0xa252a99f8ae71b38!2sTopaz%20Place!5e0!3m2!1sen!2sid!4v1731829174431!5m2!1sen!2sid";
            break;
        case 'kostAJ1':
            name = "KOST AJ 1";
            address = "Lingkungan 11, Airmadidi Atas, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara";
            price = "Rp. 500.000 / Bulan";
            type = "Kost Wanita";
            images = ["gambar/kostAJ1-1.jpg", "gambar/kostAJ1-2.jpg"];
            facilities = ["Kamar Mandi Dalam", "Kasur", "Meja", "Lemari"];
            contact = "0813-1044-9264";
            mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.598127105785!2d124.98487707477763!3d1.4170541485695927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870fff6f4321e7%3A0x864424f4afce6bd2!2sA%26J%20Kost%201%20Airmadidi!5e0!3m2!1sen!2sid!4v1731483477476!5m2!1sen!2sid";
            break;
        case 'kostGazelle':
            name = "KOST GAZELLE";
            address = "Airmadidi Atas, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara";
            price = "Rp. 1.000.000 / Bulan";
            type = "Kost Wanita";
            images = ["gambar/kostGazelle.png"];
            facilities = ["Tempat Tidur", "AC", "Lemari", "Kamar Mandi Dalam"];
            contact = "-";
            mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5968088754244!2d124.9862718460187!3d1.417819435070909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870ff82f340ac1%3A0x796cf97336a92ac0!2sKos%20Gazelle!5e0!3m2!1sen!2sid!4v1731829370884!5m2!1sen!2sid";
            break;
        case 'kostYeyen':
            name = "KOST YEYEN";
            address = "Unnamed Road, Airmadidi Atas, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara";
            price = "Rp. 600.000 / Bulan";
            type = "Kost Wanita";
            images = ["gambar/kostYeyen.png"];
            facilities = ["Kamar Mandi Dalam", "Wi-Fi Gratis", "Kasur", "Lemari"];
            contact = "-";
            mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.6008764688886!2d124.98695620000001!3d1.4154567000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870f9433bb154d%3A0x5d38ebfd8b8d960d!2sKost%20Yeyen!5e0!3m2!1sen!2sid!4v1731829671520!5m2!1sen!2sid";
            break;
        case 'kostIstanaMutiara':
            name = "KOST ISTANA MUTIARA";
            address = "Jalan Airmadidi Bawah, Airmadidi Bawah, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara";
            price = "Rp. 600.000 / Bulan";
            type = "Kost Wanita";
            images = ["gambar/kostIstanaMutiara1.png", "gambar/kostIstanaMutiara2.png"];
            facilities = ["Tempat Tidur", "Wi-Fi Gratis", "Kamar Mandi Dalam"];
            contact = "-";
            mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.6021627832597!2d124.98593309999998!3d1.4147087000000147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870ffc88ddbe61%3A0x72e35fafd3a53425!2sKost%20Istana%20Mutiara!5e0!3m2!1sen!2sid!4v1731829820506!5m2!1sen!2sid";
            break;
        case 'kostAuntyLivy':
            name = "KOST AUNTY LIVY";
            address = "Airmadidi Atas, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara";
            price = "Rp. 600.000 / Bulan";
            type = "Kost Wanita";
            images = ["gambar/kostAuntyLivy.png"];
            facilities = ["Kamar Mandi Dalam", "Tempat Tidur", "Meja"];
            contact = "-";
            mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.600557880711!2d124.98677500000001!3d1.41564190000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870f8d75f14d55%3A0x9fc82eea8d8cbbdd!2sKos%20aunty%20Livy!5e0!3m2!1sen!2sid!4v1731830063172!5m2!1sen!2sid";
            break;
        case 'azaleaHall':
            name = "AZALEA HALL";
            address = "Jl. Arnold Mononutu, Airmadidi Bawah, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara 95371";
            price = "Rp. 1.000.000 / Bulan";
            type = "Kost Wanita";
            images = ["gambar/azaleaHall.png"];
            facilities = ["Kamar Mandi Dalam", "Tempat Tidur", "Meja", "Kursi", "Lemari", "AC"];
            contact = "-";
            mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.595975552572!2d124.98616670000001!3d1.4183029999999954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870f39cbd3d06b%3A0xada23fc5f5da003f!2sAzalea%20Hall!5e0!3m2!1sen!2sid!4v1731831856196!5m2!1sen!2sid";
            break;
        case 'kostAsdith':
            name = "KOST ASDITH";
            address = "Airmadidi Bawah, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara";
            price = "Rp. 300.000 / Bulan";
            type = "Kost Pria";
            images = ["gambar/kostAsdith1.jpg", "gambar/kostAsdith2.jpg", "gambar/kostAsdith3.jpg"];
            facilities = ["Tempat Tidur", "Meja", "Kursi", "Lemari"];
            contact = "-";
            mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.603269537801!2d124.98537857477758!3d1.414064798572603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870f4d865caaf3%3A0xcf78b420b8749a47!2sKost%20Asdith!5e0!3m2!1sen!2sid!4v1731837852726!5m2!1sen!2sid";
            break;
        case 'kostSion':
            name = "KOST SION";
            address = "Jl. Airmadidi Atas, Airmadidi Bawah, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara";
            price = "Rp. 400.000 / Bulan";
            type = "Kost Pria";
            images = ["gambar/kostSion.jpg"];
            facilities = ["Tempat Tidur", "Meja", "Kursi", "Lemari"];
            contact = "-";
            mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127635.30470567362!2d124.90555133324382!3d1.4140633353219472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870f30262b4843%3A0x93654c4583576812!2sKost%20Sion%20Kel.%20Jack%20Kussoy%20Weol!5e0!3m2!1sen!2sid!4v1731839801915!5m2!1sen!2sid";
            break;
        case 'kostTumoutou':
            name = "KOST TUMOUTOU";
            address = "Airmadidi Atas, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara";
            price = "Rp. 400.000 / Bulan";
            type = "Kost Pria";
            images = ["gambar/kostTumoutou.jpg"];
            facilities = ["Tempat Tidur", "Meja", "Kursi", "Lemari"];
            contact = "-";
            mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.6018445353398!2d124.98740939999999!3d1.4148938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870f2d07b64221%3A0x3b68fc3d6e2e40cb!2sKost%20Tumoutou!5e0!3m2!1sen!2sid!4v1731839872875!5m2!1sen!2sid";
            break;
        case 'kostMahunutu':
            name = "KOST MAHUNUTU";
            address = "Airmadidi Atas, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara";
            price = "Rp. 500.000 / Bulan";
            type = "Kost Pria";
            images = ["gambar/kostMahunutu.jpg"];
            facilities = ["Tempat Tidur", "Meja", "Kursi", "Lemari", "Kamar Mandi Dalam"];
            contact = "-";
            mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5986294671!2d124.98557567477758!3d1.4167623985698703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870fd776b64db5%3A0x41da3c486202ef80!2sKos%20Manuhutu!5e0!3m2!1sen!2sid!4v1731840013767!5m2!1sen!2sid";
            break;
        case 'kostImanuelFrans':
            name = "KOST IMANUEL FRANS";
            address = "Airmadidi Bawah, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara";
            price = "Rp. 350.000 / Bulan";
            type = "Kost Pria";
            images = ["gambar/kostImanuelFrans.jpg"];
            facilities = ["Tempat Tidur", "Meja", "Kursi", "Lemari"];
            contact = "-";
            mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.6048374472466!2d124.98161627477768!3d1.4131520985735284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870efaac95a62b%3A0x5ae7030158271256!2sKost%20Imanuel%20Frans!5e0!3m2!1sen!2sid!4v1731840162873!5m2!1sen!2sid";
            break;
        case 'kostAJ2':
            name = "KOST AJ 2";
            address = "Lingkungan 10, Airmadidi Atas, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara";
            price = "Rp. 600.000 / Bulan";
            type = "Kost Pria";
            images = ["gambar/kostAJ2-1.jpg", "gambar/kostAJ2-2.png", "gambar/kostAJ2-3.png", "gambar/kostAJ2-4.png"];
            facilities = ["Tempat Tidur", "Meja", "Kursi", "Lemari", "AC", "Kamar Mandi Dalam", "Wi-Fi Gratis"];
            contact = "0813-1044-9264";
            mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5981246063234!2d124.98686020000001!3d1.4170555999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870ee69c0752bf%3A0xc988352232252af9!2sA%26J%20Kost%202%20Airmadidi!5e0!3m2!1sen!2sid!4v1731840460978!5m2!1sen!2sid";
            break;
        case 'kostPeleh':
            name = "KOST PELEH";
            address = "Yordan, Kel. Airmadidi Bawah, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara";
            price = "Rp. 300.000 / Bulan";
            type = "Kost Pria";
            images = ["gambar/kostPeleh.jpg"];
            facilities = ["Tempat Tidur", "Meja", "Kursi", "Lemari"];
            contact = "0822-9219-6029";
            mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.6030310073374!2d124.98302897477765!3d1.4142035985724573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870f6e98a9af4f%3A0xab0c775aac6f244a!2sPeleh%20Kost!5e0!3m2!1sen!2sid!4v1731840730538!5m2!1sen!2sid";
            break;
        default:
            name = "Kost tidak ditemukan";
            address = "";
            price = "";
            type = "";
            images = "images/default.jpg";
            facilities = [];
            contact = "Tidak ada kontak tersedia";
            mapUrl = "";
    }

    // Update informasi kost
    document.getElementById("kostName").innerText = name;
    document.getElementById("kostAddress").innerText = address;
    document.getElementById("kostPrice").innerText = price;
    document.getElementById("kostType").innerText = type;
    document.getElementById("kostContact").innerText = contact;
    document.getElementById('kostMap').src = mapUrl;

    // Isi carousel gambar
    const kostImageContainer = document.getElementById("kostImageContainer");
    kostImageContainer.innerHTML = ""; // Reset isi carousel
    images.forEach((image, index) => {
        const div = document.createElement("div");
        div.className = `carousel-item${index === 0 ? " active" : ""}`; // Gambar pertama aktif
        div.innerHTML = `<img src="${image}" class="d-block w-100" alt="Gambar Kost">`;
        kostImageContainer.appendChild(div);
    });

    // Fasilitas Ikon
    const facilityIcons = {
        "Wi-Fi Gratis": "fas fa-wifi",
        "Kamar Mandi Dalam": "fas fa-bath",
        "AC": "fas fa-snowflake",
        "Dapur Bersama": "fas fa-utensils",
        "Keamanan 24 Jam": "fas fa-shield-alt",
        "Kasur": "fas fa-bed",
        "Lemari": "fas fa-wardrobe",
        "Meja": "fas fa-table",
        "Kursi": "fas fa-chair",
        "TV": "fas fa-tv",
        "Dapur": "fas fa-kitchen",
        "Kulkas Bersama": "fas fa-refrigerator",
        "Tempat Tidur": "fas fa-bed"
    };

    // Isi fasilitas
    const facilitiesList = document.getElementById("kostFacilities");
    facilitiesList.innerHTML = "";
    facilities.forEach(facility => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `<i class="${facilityIcons[facility]}"></i> ${facility}`;
        facilitiesList.appendChild(li);
    });
}

window.onload = function() {
    const kostId = getQueryParameter('kost');
    if (kostId) {
        showDetails(kostId);
    } else {
        document.getElementById("kostName").innerText = "Kost tidak ditemukan";
    }
};