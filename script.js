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
