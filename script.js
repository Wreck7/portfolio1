window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  preloader.style.pointerEvents = "none";
  setTimeout(() => preloader.remove(), 800);
});

// Theme Toggle
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.querySelector(".theme-icon");

  if (body.getAttribute("data-theme") === "light") {
    body.removeAttribute("data-theme");
    themeIcon.textContent = "🌙";
  } else {
    body.setAttribute("data-theme", "light");
    themeIcon.textContent = "☀️";
  }
}

// Contact Details Toggle
function toggleContactDetails() {
  const details = document.getElementById("contactDetails");
  const btnText = document.getElementById("contactBtnText");

  if (details.classList.contains("show")) {
    details.classList.remove("show");
    btnText.textContent = "Show Contact Details";
  } else {
    details.classList.add("show");
    btnText.textContent = "Hide Contact Details";
    // Trigger contact item animations
    document.querySelectorAll(".contact-item").forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("animate");
      }, index * 150);
    });
  }
}

// Role Typing Effect for Home Section
const roleTypingText = document.getElementById("roleTypingText");
const roles = [
  "Full Stack Developer",
  "Python Developer",
  "UI/UX Enthusiast",
  "Web Developer",
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    roleTypingText.innerHTML =
      currentRole.substring(0, charIndex) + '<span class="cursor"></span>';
    charIndex--;

    if (charIndex < 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 200);
    } else {
      setTimeout(typeRole, 50);
    }
  } else {
    roleTypingText.innerHTML =
      currentRole.substring(0, charIndex + 1) + '<span class="cursor"></span>';
    charIndex++;

    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, 1500);
    } else {
      setTimeout(typeRole, 100);
    }
  }
}

// Typing Effect for About Section
const typingText = document.getElementById("typingText");
const text =
  "I'm Vishwa Govula, a passionate Full Stack Developer and UI/UX enthusiast dedicated to creating innovative digital experiences. With a strong foundation in modern web technologies, I specialize in building responsive, user-friendly applications that solve real-world problems. My journey in tech is driven by curiosity, creativity, and a commitment to continuous learning. I enjoy transforming ideas into functional, beautiful web solutions and am always excited to take on new challenges that push the boundaries of what's possible.";
let index = 0;

function typeText() {
  if (index < text.length) {
    typingText.innerHTML =
      text.substring(0, index + 1) + '<span class="cursor"></span>';
    index++;
    setTimeout(typeText, 40);
  } else {
    typingText.innerHTML = text + '<span class="cursor"></span>';
  }
}

// Carousel Functionality
const carouselInner = document.querySelector(".carousel-inner");
const slides = document.querySelectorAll(".project-slide");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const dots = document.querySelectorAll(".carousel-dot");
let currentIndex = 0;
let autoSlideInterval;

function updateCarousel() {
  carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentIndex);
  });
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

nextBtn.addEventListener("click", () => {
  stopAutoSlide();
  nextSlide();
  startAutoSlide();
});

prevBtn.addEventListener("click", () => {
  stopAutoSlide();
  prevSlide();
  startAutoSlide();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    stopAutoSlide();
    goToSlide(index);
    startAutoSlide();
  });
});

// Enhanced scroll animations
function animateOnScroll() {
  const sections = document.querySelectorAll("section");
  const skillCategories = document.querySelectorAll(".skill-category");
  const carousel = document.querySelector(".carousel");
  const contactForm = document.querySelector(".contact-form");
  const contactInfo = document.querySelector(".contact-info-section");
  const formGroups = document.querySelectorAll(".form-group");
  const scrollTop = window.pageYOffset;

  // Section animations
  sections.forEach((section) => {
    const offsetTop = section.offsetTop;
    const height = section.offsetHeight;

    if (scrollTop >= offsetTop - window.innerHeight + 150) {
      section.classList.add("visible");
    }
  });

  // Skills animation with stagger
  skillCategories.forEach((category, index) => {
    const offsetTop = category.offsetTop;
    if (scrollTop >= offsetTop - window.innerHeight + 200) {
      setTimeout(() => {
        category.classList.add("animate");
      }, index * 250);
    }
  });

  // Carousel animation
  if (carousel && scrollTop >= carousel.offsetTop - window.innerHeight + 200) {
    carousel.style.opacity = "1";
    carousel.style.transform = "translateY(0)";
  }

  // Contact section animations
  if (
    contactForm &&
    scrollTop >= contactForm.offsetTop - window.innerHeight + 200
  ) {
    contactForm.classList.add("animate");
    formGroups.forEach((group, index) => {
      setTimeout(() => {
        group.classList.add("animate");
      }, index * 150);
    });
  }
  if (
    contactInfo &&
    scrollTop >= contactInfo.offsetTop - window.innerHeight + 200
  ) {
    setTimeout(() => {
      contactInfo.classList.add("animate");
    }, 250);
  }
}

// Navigation highlighting
function updateNavigation() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");
  const scrollTop = window.pageYOffset + 100;

  sections.forEach((section, index) => {
    const offsetTop = section.offsetTop;
    const height = section.offsetHeight;

    if (scrollTop >= offsetTop && scrollTop < offsetTop + height) {
      navLinks.forEach((link) => link.classList.remove("active"));
      if (navLinks[index]) navLinks[index].classList.add("active");
    }
  });
}

// Scroll progress indicator
function updateScrollIndicator() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.querySelector(".scroll-indicator").style.width = scrollPercent + "%";
}

// Smooth scrolling for navigation links
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: "smooth" });
  });
});

// Enhanced form submission with animation
document.querySelector(".contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const submitBtn = document.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.style.background = "var(--hover-color)";

  setTimeout(() => {
    submitBtn.textContent = "Message Sent!";
    submitBtn.style.transform = "scale(1.05)";
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = "var(--accent-color)";
      submitBtn.style.transform = "scale(1)";
      e.target.reset();
    }, 2000);
  }, 1000);
});

// Initialize
window.addEventListener("load", () => {
  animateOnScroll();
  updateNavigation();
  updateScrollIndicator();
  startAutoSlide();

  // Start role typing effect when home section becomes visible
  const homeSection = document.getElementById("home");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(typeRole, 500);
        observer.unobserve(homeSection);
      }
    });
  });
  observer.observe(homeSection);

  // Start typing effect when about section becomes visible
  const aboutSection = document.getElementById("about");
  const observerAbout = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(typeText, 500);
        observerAbout.unobserve(aboutSection);
      }
    });
  });
  observerAbout.observe(aboutSection);
});

window.addEventListener("scroll", () => {
  animateOnScroll();
  updateNavigation();
  updateScrollIndicator();
});

// Enhanced parallax effect with subtle movement
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector("#home");
  const speed = scrolled * 0.3;
  if (parallax) {
    parallax.style.transform = `translateY(${speed}px)`;
  }
});
