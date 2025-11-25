// Basic interactivity for the portfolio site
// - Mobile navigation toggle
// - Active nav link on scroll
// - Scroll to top button
// - Scroll-triggered animations
// - Dynamic current year
// - Dark/Light theme toggle

const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const scrollTopBtn = document.getElementById("scroll-top");
const animateEls = document.querySelectorAll("[data-animate]");
const themeToggle = document.getElementById("theme-toggle");

// Dark/Light theme toggle
if (themeToggle) {
  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener("click", () => {
    const theme = document.documentElement.getAttribute("data-theme");
    const newTheme = theme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector(".theme-icon");
  if (icon) {
    icon.textContent = theme === "dark" ? "◑" : "◐";
  }
}

// Mobile navigation toggle
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.querySelector(".nav-list").classList.toggle("open");
    navToggle.classList.toggle("open");
  });

  // Close nav after clicking a link (on mobile)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.querySelector(".nav-list").classList.remove("open");
      navToggle.classList.remove("open");
    });
  });
}

// Smooth scroll behavior is mostly handled by CSS scroll-behavior, but this
// ensures older browsers get a basic smooth-like scroll.
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.offsetTop - 72; // approximate header height
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll("section[id]");

function setActiveNavLink() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelectorAll('.nav-link[href^="#"]')
        .forEach((link) => link.classList.remove("active"));

      const currentLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (currentLink) currentLink.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveNavLink);

// Scroll to top button visibility + behavior
function handleScrollTopVisibility() {
  if (!scrollTopBtn) return;
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

window.addEventListener("scroll", handleScrollTopVisibility);

// Scroll-triggered animations using Intersection Observer (if available)
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  animateEls.forEach((el) => observer.observe(el));
} else {
  // Fallback: show all on load if IntersectionObserver is not supported
  animateEls.forEach((el) => el.classList.add("animated"));
}

// Dynamic current year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}

// Optional: prevent default submit and show a simple alert for the contact form
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for your message! This demo form is not yet connected to a backend.");
    contactForm.reset();
  });
}

// Generic helper to wire a simple carousel
function setupCarousel(rootSelector, slideSelector, prevSelector, nextSelector) {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  const slides = Array.from(root.querySelectorAll(slideSelector));
  const prevBtn = root.querySelector(prevSelector);
  const nextBtn = root.querySelector(nextSelector);
  if (!slides.length) return;

  let currentIndex = slides.findIndex((s) => s.classList.contains("is-active"));
  if (currentIndex < 0) currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === index);
    });
  }

  function goTo(offset) {
    currentIndex = (currentIndex + offset + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  if (prevBtn) prevBtn.addEventListener("click", () => goTo(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => goTo(1));
}

// MindWell carousel
setupCarousel("[data-project-carousel]", ".carousel-slide", "[data-carousel-prev]", "[data-carousel-next]");

// AI Education Hub carousel
setupCarousel("[data-project-carousel-ai]", ".carousel-slide", "[data-carousel-prev-ai]", "[data-carousel-next-ai]");

// UniMindCare carousel
setupCarousel("[data-project-carousel-uni]", ".carousel-slide", "[data-carousel-prev-uni]", "[data-carousel-next-uni]");

// Online Library (microservices) carousel
setupCarousel("[data-project-carousel-micro]", ".carousel-slide", "[data-carousel-prev-micro]", "[data-carousel-next-micro]");

// ML Models for Student Well-being Prediction carousel
setupCarousel("[data-project-carousel-ml]", ".carousel-slide", "[data-carousel-prev-ml]", "[data-carousel-next-ml]");

// Advanced CI/CD Pipeline Automation carousel
setupCarousel("[data-project-carousel-devops]", ".carousel-slide", "[data-carousel-prev-devops]", "[data-carousel-next-devops]");

// UX/UI Web App for Rare Collectibles carousel
setupCarousel("[data-project-carousel-ux]", ".carousel-slide", "[data-carousel-prev-ux]", "[data-carousel-next-ux]");

// Gym Management System (FlexFlow) carousel
setupCarousel("[data-project-carousel-gym]", ".carousel-slide", "[data-carousel-prev-gym]", "[data-carousel-next-gym]");

// Hashgraph certificate modal
const hashgraphModal = document.getElementById("hashgraph-modal");
const openHashgraphBtns = document.querySelectorAll("[data-open-hashgraph-modal]");
const closeHashgraphEls = document.querySelectorAll("[data-close-hashgraph-modal]");

if (hashgraphModal) {
  openHashgraphBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      hashgraphModal.classList.add("open");
    });
  });

  closeHashgraphEls.forEach((el) => {
    el.addEventListener("click", () => {
      hashgraphModal.classList.remove("open");
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hashgraphModal.classList.remove("open");
    }
  });
}
