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
            // In a real app, we'd fetch project data here based on an ID
            // For now, we just open the modal with static carousel
            openModal(overlay);
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

function openModal(overlay) {
    overlay.classList.remove('visually-hidden');
    document.body.style.overflow = 'hidden'; // Lock Body Scroll

    // Reset Carousel to 0
    updateCarousel(0);

    const closeBtn = document.getElementById('modal-close');
    closeBtn.focus();
}

function closeModal(overlay) {
    overlay.classList.add('visually-hidden');
    document.body.style.overflow = ''; // Unlock Body Scroll
}

/* --- Carousel Logic --- */
let currentIndex = 0;
const images = [
    'assets/img/projects/covid 1.webp',
    'assets/img/projects/medicos 1.webp',
    'assets/img/projects/medicos 3.webp',
    'assets/img/projects/medicos 4.webp',
    'assets/img/projects/proyecto unac 1.webp',
    'assets/img/projects/proyecto unac 2.webp',
    'assets/img/projects/proyecto unac 3.webp',
    'assets/img/projects/Rendimiento-Estudiantil-excel.webp'
];

function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (!track) return;

    // Populate Images
    track.innerHTML = images.map(src => `<img src="${src}" style="min-width: 100%; transition: transform 0.3s ease;">`).join('');

    // Buttons
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) currentIndex--;
        else currentIndex = images.length - 1;
        updateCarousel(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < images.length - 1) currentIndex++;
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
                if (currentIndex < images.length - 1) currentIndex++;
                else currentIndex = 0;
            } else {
                // Swipe Right -> Prev
                if (currentIndex > 0) currentIndex--;
                else currentIndex = images.length - 1;
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
