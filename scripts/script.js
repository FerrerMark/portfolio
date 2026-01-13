function renderCertifications() {
  const container = document.getElementById("certificates-container");
  container.innerHTML = certifications
    .map(
      (cert) => `
        <div class="certificate-tile">
            <div class="div">
                <h3>${cert.title}</h3>
                <p>${cert.year} - ${cert.description}</p>
            </div>
            <a href="${cert.link}" target="_blank" class="certificate-link">
                View Certificate
            </a>
        </div>
    `
    )
    .join("");
}

function renderProjects() {
  const container = document.getElementById("projects-container");
  container.innerHTML = projects
    .map(
      (project) => `
        <div class="project-tile">
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank">View More</a>
            ${
              project.deployed
                ? `<a href="${project.deployed}" target="_blank"><button class="deployed">Visit site</button></a>`
                : ""
            }
        </div>
    `
    )
    .join("");

  const projectImages = document.querySelectorAll(".project-tile img");
  projectImages.forEach((img) => {
    img.addEventListener("click", function () {
      projectModal.style.display = "flex";
      modalImg.src = this.src;
      document.body.style.overflow = "hidden";
      setTimeout(() => projectModal.classList.add("show"), 10);
    });
  });
}

document.getElementById("menu").onclick = function () {
  document.getElementById("navbar").classList.toggle("active");
};

document.getElementById("icon").onclick = function () {
  document.getElementById("navbar").classList.remove("active");
};

const projectModal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const projectCloseBtn = document.querySelector("#imageModal .close");

projectCloseBtn.onclick = function () {
  projectModal.classList.remove("show");
  document.body.style.overflow = "auto";
  setTimeout(() => {
    projectModal.style.display = "none";
  }, 300);
};

projectModal.onclick = function (event) {
  if (event.target === projectModal) {
    projectModal.classList.remove("show");
    document.body.style.overflow = "auto";
    setTimeout(() => {
      projectModal.style.display = "none";
    }, 300);
  }
};

const profileModal = document.getElementById("profileModal");
const profileModalImg = document.getElementById("profileModalImage");
const profileCloseBtn = document.querySelector("#profileModal .close");
const prevBtn = document.getElementById("prevImage");
const nextBtn = document.getElementById("nextImage");

const profileImages = [
  "./img/pic/image.png",
  "./img/pic/gradpic1.jpeg",
  "./img/pic/gradpic2.jpeg",
];

let currentImageIndex = 0;

function openProfileModal() {
  profileModal.style.display = "flex";
  currentImageIndex = 0;
  profileModalImg.src = profileImages[currentImageIndex];
  document.body.style.overflow = "hidden";
  setTimeout(() => profileModal.classList.add("show"), 10);
}

prevBtn.addEventListener("click", () => {
  currentImageIndex =
    (currentImageIndex - 1 + profileImages.length) % profileImages.length;
  profileModalImg.src = profileImages[currentImageIndex];
});

nextBtn.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex + 1) % profileImages.length;
  profileModalImg.src = profileImages[currentImageIndex];
});

profileCloseBtn.onclick = function () {
  profileModal.classList.remove("show");
  document.body.style.overflow = "auto";
  setTimeout(() => {
    profileModal.style.display = "none";
  }, 300);
};

profileModal.onclick = function (event) {
  if (event.target === profileModal) {
    profileModal.classList.remove("show");
    document.body.style.overflow = "auto";
    setTimeout(() => {
      profileModal.style.display = "none";
    }, 300);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderCertifications();
  renderProjects();
});

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;

      if (
        pageYOffset >= sectionTop &&
        pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
});

const images = document.querySelectorAll(".images img");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
let currentIndex = 0;

function showImage(index) {
  images.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
});

showImage(currentIndex);

function moveSlider(direction, containerId) {
  const container = document.getElementById(containerId);
  const images = container.querySelectorAll("img");
  let activeIndex = Array.from(images).findIndex((img) =>
    img.classList.contains("active")
  );

  // Remove active class from current
  images[activeIndex].classList.remove("active");

  // Calculate new index
  activeIndex = (activeIndex + direction + images.length) % images.length;

  // Add active class to new image
  images[activeIndex].classList.add("active");
}
