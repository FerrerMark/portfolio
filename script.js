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

    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('close')[0];

    const projectImages = document.querySelectorAll('.project-tile img');

    projectImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImg.src = this.src;
            document.body.style.overflow = 'hidden';
            setTimeout(() => modal.classList.add('show'), 10);
        });
    });

    closeBtn.onclick = function() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    };

    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    };
