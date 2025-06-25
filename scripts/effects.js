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
