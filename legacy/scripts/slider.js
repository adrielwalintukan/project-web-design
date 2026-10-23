const sliderImages = [
    'gambar/kostWullur1.jpg',
    'gambar/kostMizpa.png',
    'gambar/cornerResidence1.jpg',
    'gambar/kostMaringka1.jpg',
    'gambar/azaleaHall.png'
];

const heroSection = document.querySelector('.hero-modern');
let currentIndex = 0;

// Preload images
sliderImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

function changeBackground() {
    // Create a new layer for the next image interactively
    const nextImage = sliderImages[currentIndex];

    // Smooth transition logic
    heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('${nextImage}')`;

    currentIndex = (currentIndex + 1) % sliderImages.length;
}

// Initial set
changeBackground();

// Interval
setInterval(changeBackground, 5000); // Change every 5 seconds
