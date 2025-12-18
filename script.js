/*
 * Portfolio JavaScript (Optimized for Mobile & Desktop)
 * Features:
 * - Sticky header active link highlight
 * - Theme toggle with localStorage
 * - Reveal animations on scroll
 * - Mobile navigation improvements
 */

// ---------- Cached DOM Elements ----------
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// ---------- Sticky Nav Link Highlight ----------
function highlightNavLink() {
  let scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"));
      document
        .querySelector(`.nav-link[href*=${sectionId}]`)
        ?.classList.add("active");
    }
  });
}

// Debounce for better performance on scroll
let scrollTimeout;
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(highlightNavLink, 50);
});

// ---------- Theme Toggle ----------
function setTheme(darkMode) {
  if (darkMode) {
    body.classList.add("dark");
    localStorage.setItem("theme", "dark");
    themeToggle.innerHTML = "☀️";
  } else {
    body.classList.remove("dark");
    localStorage.setItem("theme", "light");
    themeToggle.innerHTML = "🌙";
  }
}

// Load saved theme
const savedTheme = localStorage.getItem("theme");
setTheme(savedTheme === "dark");

themeToggle.addEventListener("click", () => {
  const darkMode = !body.classList.contains("dark");
  setTheme(darkMode);
});

// ---------- Mobile Menu Auto-Close ----------
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.querySelector(".nav");
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
    }
  });
});

// ---------- Reveal Animations on Scroll ----------
const revealElements = document.querySelectorAll(".hidden");

const revealOnScroll = () => {
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("show");
      el.classList.remove("hidden");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ---------- Optional: Mobile Nav Toggle Button (if you add a hamburger icon) ----------
const mobileToggle = document.getElementById("mobile-toggle");
if (mobileToggle) {
  mobileToggle.addEventListener("click", () => {
    document.querySelector(".nav").classList.toggle("open");
  });
}
