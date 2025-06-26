document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".floating-circles");
  const directions = ["", "left", "right", "diagonal"];

  sections.forEach(section => {
    section.style.position = "relative";
    section.style.overflow = "hidden";

    const container = document.createElement("div");
    container.classList.add("circles-container");
    section.appendChild(container);

    for (let i = 0; i < 30; i++) {
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

    for (let i = 0; i < 60; i++) {
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