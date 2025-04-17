function menu() {
    const navbar = document.getElementById('navbar');
    const body = document.body;
    navbar.classList.toggle('show');
    body.classList.toggle('menu-open');
}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('fade-out');
            entry.target.classList.add('fade-in');
        } else {
            entry.target.classList.remove('fade-in');
            entry.target.classList.add('fade-out');
        }
    });
}, {
    threshold: 0.1
});

const sections = document.querySelectorAll('#welcome-section, #certifications, #projects, #contact');
sections.forEach(section => {
    observer.observe(section);
});

const projectModal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const projectCloseBtn = document.querySelector('#imageModal .close');

const projectImages = document.querySelectorAll('.project-tile img');

projectImages.forEach(img => {
    img.addEventListener('click', function() {
        projectModal.style.display = 'flex';
        modalImg.src = this.src;
        document.body.style.overflow = 'hidden';
        setTimeout(() => projectModal.classList.add('show'), 10);
    });
});

projectCloseBtn.onclick = function() {
    projectModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    setTimeout(() => {
        projectModal.style.display = 'none';
    }, 300);
};

projectModal.onclick = function(event) {
    if (event.target === projectModal) {
        projectModal.classList.remove('show');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            projectModal.style.display = 'none';
        }, 300);
    }
};

// Profile Image Modal
const profileModal = document.getElementById('profileModal');
const profileModalImg = document.getElementById('profileModalImage');
const profileCloseBtn = document.querySelector('#profileModal .close');
const prevBtn = document.getElementById('prevImage');
const nextBtn = document.getElementById('nextImage');

const profileImages = [
    './img/pic/image.png',
    './img/pic/gradpic1.jpeg',
    './img/pic/gradpic2.jpeg',
];

let currentImageIndex = 0;

function openProfileModal() {
    profileModal.style.display = 'flex';
    currentImageIndex = 0;
    profileModalImg.src = profileImages[currentImageIndex];
    document.body.style.overflow = 'hidden';
    setTimeout(() => profileModal.classList.add('show'), 10);
}

prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + profileImages.length) % profileImages.length;
    profileModalImg.src = profileImages[currentImageIndex];
});

nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % profileImages.length;
    profileModalImg.src = profileImages[currentImageIndex];
});

profileCloseBtn.onclick = function() {
    profileModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    setTimeout(() => {
        profileModal.style.display = 'none';
    }, 300);
};

profileModal.onclick = function(event) {
    if (event.target === profileModal) {
        profileModal.classList.remove('show');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            profileModal.style.display = 'none';
        }, 300);
    }
};
