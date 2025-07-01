document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".floating-circles");
  const directions = ["", "left", "right", "diagonal"];

  sections.forEach(section => {
    section.style.position = "relative";
    section.style.overflow = "hidden";

    const container = document.createElement("div");
    container.classList.add("circles-container");
    section.appendChild(container);

    for (let i = 0; i < 10; i++) {
      const circle = document.createElement("span");

      const size = Math.floor(Math.random() * 60) + 20;
      const top = Math.floor(Math.random() * 100);
      const left = Math.floor(Math.random() * 100);
      const delay = Math.random() * 5;
      const duration = Math.random() * 5 + 10;

      const direction = directions[Math.floor(Math.random() * directions.length)];

      circle.classList.add("animated-circle");
      if (direction) circle.classList.add(direction);

      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      circle.style.top = `${top}%`;
      circle.style.left = `${left}%`;
      circle.style.animationDelay = `${delay}s`;
      circle.style.animationDuration = `${duration}s`;

      container.appendChild(circle);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".box-bg-effect");

  targets.forEach(target => {
    const container = document.createElement("div");
    container.classList.add("boxes-container");
    target.appendChild(container);

    for (let i = 0; i < 10; i++) {
      const box = document.createElement("div");
      box.className = 'box';

      const size = Math.floor(Math.random() * 20) + 30;
      const startTop = Math.random() * 100;
      const startLeft = Math.random() * 100;

      box.style.width = `${size}px`;
      box.style.height = `${size}px`;
      box.style.top = `${startTop}%`;
      box.style.left = `${startLeft}%`;

      ["front", "back", "left", "right", "top", "bottom"].forEach(faceName => {
        const face = document.createElement("div");
        face.className = `face ${faceName}`;
        face.style.width = `${size}px`;
        face.style.height = `${size}px`;
        box.appendChild(face);
      });

      let rotX = Math.random() * 360;
      let rotY = Math.random() * 360;
      let posX = startLeft;
      let posY = startTop;

      const speedX = (Math.random() - 0.5) * 0.2; // slow horizontal drift
      const speedY = (Math.random() - 0.5) * 0.2; // slow vertical drift
      const rotateSpeedX = (Math.random() - 0.5) * 1.5;
      const rotateSpeedY = (Math.random() - 0.5) * 1.5;

      function animate() {
        rotX += rotateSpeedX;
        rotY += rotateSpeedY;
        posX += speedX;
        posY += speedY;

        if (posX > 100) posX = -5;
        if (posX < -5) posX = 100;
        if (posY > 100) posY = -5;
        if (posY < -5) posY = 100;

        box.style.transform = `translate(${posX}vw, ${posY}vh) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        requestAnimationFrame(animate);
      }

      animate();
      container.appendChild(box);
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".pyra-bg");

  targets.forEach(target => {
    const container = document.createElement("div");
    container.classList.add("pyramids-container");
    target.appendChild(container);

    for (let i = 0; i < 5; i++) {
      const pyramid = document.createElement("div");
      pyramid.className = "pyramid";

      const size = Math.random() * 20 + 30;
      const halfSize = size / 2;
      const height = size;

      const startTop = Math.random() * 100;
      const startLeft = Math.random() * 100;

      pyramid.style.width = `${size}px`;
      pyramid.style.height = `${height}px`;
      pyramid.style.top = "0";
      pyramid.style.left = "0";

      const colors = [
        "front", "left", "right", "back"
      ];

      colors.forEach((side, idx) => {
        const face = document.createElement("div");
        face.className = `pyramid-face ${side}`;
        face.style.width = `0`;
        face.style.height = `0`;
        face.style.borderLeft = `${halfSize}px solid transparent`;
        face.style.borderRight = `${halfSize}px solid transparent`;
        face.style.borderBottom = `${height}px solid rgba(0,150,255,0.07)`;
        face.style.position = "absolute";

        switch (side) {
          case "front":
            face.style.transform = `rotateX(-70deg) translateZ(${halfSize}px)`;
            break;
          case "back":
            face.style.transform = `rotateX(70deg) translateZ(-${halfSize}px)`;
            break;
          case "left":
            face.style.transform = `rotateY(-70deg) translateX(-${halfSize}px)`;
            break;
          case "right":
            face.style.transform = `rotateY(70deg) translateX(${halfSize}px)`;
            break;
        }

        pyramid.appendChild(face);
      });

      let rotX = Math.random() * 360;
      let rotY = Math.random() * 360;
      let posX = startLeft;
      let posY = startTop;
      let tick = Math.random() * 100;

      const speedX = (Math.random() - 0.5) * 0.15;
      const speedY = (Math.random() - 0.5) * 0.15;
      const rotSpeedX = (Math.random() - 0.5) * 1.2;
      const rotSpeedY = (Math.random() - 0.5) * 1.2;

      function animate() {
        rotX += rotSpeedX;
        rotY += rotSpeedY;
        posX += speedX;
        posY += speedY;
        tick += 0.02;

        if (posX > 105) posX = -10;
        if (posX < -10) posX = 105;
        if (posY > 105) posY = -10;
        if (posY < -10) posY = 105;

        const opacity = 0.2 + Math.abs(Math.sin(tick)) * 0.4;

        pyramid.style.opacity = opacity.toFixed(2);
        pyramid.style.transform = `
          translate(${posX}vw, ${posY}vh)
          rotateX(${rotX}deg)
          rotateY(${rotY}deg)
        `;

        requestAnimationFrame(animate);
      }

      animate();
      container.appendChild(pyramid);
    }
  });
});

       const sections = ["#welcome-section", "#certifications", "#projects", "#contact"];

        sections.forEach(selector => {
            if (selector === "#welcome-section") {
                gsap.fromTo(selector,
                    { opacity: 1 },
                    {
                        opacity: 0,
                        scrollTrigger: {
                            trigger: selector,
                            start: "top top", 
                            end: "bottom top",
                            scrub: 1,
                            markers: false
                        }
                    }
                );
            } else {
                gsap.fromTo(selector,
                    { opacity: 1 },
                    {
                        opacity: 0,
                        scrollTrigger: {
                            trigger: selector,
                            start: "bottom bottom",
                            end: "bottom top",
                            scrub: 1,
                            markers: false
                        }
                    }
                );
            }
        });

        const projectsContainer = document.getElementById('projects-container');

let isDragging = false;
let startX, scrollLeft;

projectsContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    projectsContainer.classList.add('dragging');
    startX = e.pageX - projectsContainer.offsetLeft;
    scrollLeft = projectsContainer.scrollLeft;
    e.preventDefault();
});

projectsContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    projectsContainer.classList.remove('dragging');
});

projectsContainer.addEventListener('mouseup', () => {
    isDragging = false;
    projectsContainer.classList.remove('dragging');
});

projectsContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault(); 
    const x = e.pageX - projectsContainer.offsetLeft;
    const walk = (x - startX) * 2; 
    projectsContainer.scrollLeft = scrollLeft - walk;
});

projectsContainer.addEventListener('touchstart', (e) => {
    isDragging = true;
    projectsContainer.classList.add('dragging');
    startX = e.touches[0].pageX - projectsContainer.offsetLeft;
    scrollLeft = projectsContainer.scrollLeft;
    e.preventDefault(); 
});

projectsContainer.addEventListener('touchend', () => {
    isDragging = false;
    projectsContainer.classList.remove('dragging');
});

projectsContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - projectsContainer.offsetLeft;
    const walk = (x - startX) * 2; 
    projectsContainer.scrollLeft = scrollLeft - walk;
});

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     console.log(entry)
//     if (entry.isIntersecting) {
//       entry.target.classList.add('show');
//     } else {
//       entry.target.classList.remove('show');
//     }
//   });
// });

// const hiddenElements = document.querySelectorAll('.hidden');
// hiddenElements.forEach((el) => observer.observe(el));


function onScrollAnimate() {
  const elements = document.querySelectorAll('.scroll-animate');

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const visibleRatio = 1 - Math.abs((rect.top + rect.height / 2 - windowHeight / 2) / windowHeight);

    const clampedRatio = Math.max(0, Math.min(1, visibleRatio));

    el.style.transform = `translateX(${(1 - clampedRatio) * -100}px)`;
    el.style.opacity = clampedRatio;
  });

  requestAnimationFrame(onScrollAnimate); 
}

onScrollAnimate();

  gsap.from(".box", {
    rotation: 360,
    duration: 2.5,
    y: -500,
    ease: "bounce.out",
  });
