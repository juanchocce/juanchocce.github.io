/**
 * Projects Manager
 * Handles interactions for the projects section: Modal and Carousel
 */

export function initProjects() {
    setupModal();
}

function setupModal() {
    const cards = document.querySelectorAll('.project-card');
    const overlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close');

    if (!overlay) return;

    // Open Modal
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const projectPrefix = card.dataset.project;
            let projectImages = [];
            
            if (projectPrefix) {
                projectImages = allImages.filter(img => img.toLowerCase().includes(projectPrefix.toLowerCase()));
            } else {
                projectImages = allImages; // Fallback
            }

            openModal(overlay, projectImages);
        });
    });

    // Close Modal
    closeBtn.addEventListener('click', () => closeModal(overlay));

    // Close on click outside (backdrop)
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal(overlay);
        }
    });

    // Keyboard support (Escape and Focus Trap)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !overlay.classList.contains('visually-hidden')) {
            closeModal(overlay);
        }
    });

    // Initialize Carousel Logic
    initCarousel();
}

function openModal(overlay, imagesToShow) {
    overlay.classList.remove('visually-hidden');
    document.body.style.overflow = 'hidden'; // Lock Body Scroll

    // Load images for this project
    loadCarouselImages(imagesToShow);

    const closeBtn = document.getElementById('modal-close');
    closeBtn.focus();
}

function closeModal(overlay) {
    overlay.classList.add('visually-hidden');
    document.body.style.overflow = ''; // Unlock Body Scroll
}

/* --- Carousel Logic --- */
let currentIndex = 0;
let currentImages = [];

const allImages = [
    'assets/img/projects/covid 1.webp',
    'assets/img/projects/medicos 1.webp',
    'assets/img/projects/medicos 2.webp',
    'assets/img/projects/medicos 3.webp',
    'assets/img/projects/medicos 4.webp',
    'assets/img/projects/medicos 5.webp',
    'assets/img/projects/medicos 6.webp',
    'assets/img/projects/proyecto unac 1.webp',
    'assets/img/projects/proyecto unac 2.webp',
    'assets/img/projects/proyecto unac 3.webp',
    'assets/img/projects/Rendimiento-Estudiantil-excel.webp',
    'assets/img/projects/restaurante 1.webp',
    'assets/img/projects/restaurante 2.webp',
    'assets/img/projects/restaurante 3.webp',
    'assets/img/projects/restaurante 4.webp',
    'assets/img/projects/restaurante 5.webp',
    'assets/img/projects/restaurante 6.webp',
    'assets/img/projects/restaurante 7.webp',
    'assets/img/projects/restaurante 8.webp',
    'assets/img/projects/restaurante 9.webp',
    'assets/img/projects/restaurante 10.webp',
    'assets/img/projects/restaurante 11.webp',
    'assets/img/projects/restaurante 12.webp',
    'assets/img/projects/restaurante 13.webp',
    'assets/img/projects/restaurante 14.webp',
    'assets/img/projects/restaurante 15.webp',
    'assets/img/projects/restaurante 16.webp',
    'assets/img/projects/tinka 1.webp',
    'assets/img/projects/tinka 2.webp',
    'assets/img/projects/tinka 3.webp',
    'assets/img/projects/tinka 4.webp',
    'assets/img/projects/tinka 5.webp',
    'assets/img/projects/tinka 6.webp',
    'assets/img/projects/tinka 7.webp',
    'assets/img/projects/tinka 8.webp',
    'assets/img/projects/tinka 9.webp',
    'assets/img/projects/tinka 10.webp',  
];

function loadCarouselImages(images) {
    currentImages = images;
    currentIndex = 0;

    const track = document.querySelector('.carousel-track');
    if (!track) return;

    // Populate Images
    track.innerHTML = currentImages.map(src => `<img src="${src}" style="min-width: 100%; transition: transform 0.3s ease;">`).join('');
    
    updateCarousel(0);
}

function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (!track) return;

    // Buttons
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) currentIndex--;
        else currentIndex = currentImages.length - 1;
        updateCarousel(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < currentImages.length - 1) currentIndex++;
        else currentIndex = 0;
        updateCarousel(currentIndex);
    });

    // Swipe Support
    let startX = 0;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) { // Threshold 50px
            if (diff > 0) {
                // Swipe Left -> Next
                if (currentIndex < currentImages.length - 1) currentIndex++;
                else currentIndex = 0;
            } else {
                // Swipe Right -> Prev
                if (currentIndex > 0) currentIndex--;
                else currentIndex = currentImages.length - 1;
            }
            updateCarousel(currentIndex);
        }
    }, { passive: true });
}

function updateCarousel(index) {
    currentIndex = index;
    const track = document.querySelector('.carousel-track');
    const imgs = track.querySelectorAll('img');

    // Simple transform translation
    // Note: In a real implementation we might move the track itself, 
    // but here we can just hide/show or translate. 
    // Let's translate the track if we style it as flex.

    // Ensure track styles for sliding
    track.style.display = 'flex';
    track.style.overflow = 'hidden';
    track.style.width = '100%';

    imgs.forEach(img => {
        img.style.transform = `translateX(-${currentIndex * 100}%)`;
    });
}
