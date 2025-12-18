/*
 * script.js
 * Handles interactivity for the personal portfolio.
 * Features include:
 *  - Intersection observers for reveal animations and nav highlighting
 *  - Lightbox functionality for certifications
 *  - Skill bar animation on scroll into view
 *  - Dark/light theme toggle
 */

document.addEventListener('DOMContentLoaded', () => {
    // Reveal hidden elements when they enter the viewport
    const hiddenElements = document.querySelectorAll('.hidden');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    hiddenElements.forEach(el => revealObserver.observe(el));

    // Highlight navigation links based on the visible section
    const sections = document.querySelectorAll('main > section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    const targetId = link.getAttribute('href').substring(1);
                    if (targetId === entry.target.id) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, { threshold: 0.6 });
    sections.forEach(section => navObserver.observe(section));

    /*
     * Certification cards now link directly to external verification pages.
     * The previous lightbox functionality has been removed.
     */

    // The skills section now uses emoji icons instead of progress bars, so no bar animation is needed.

    // Dark/light theme toggle
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        // Update icon
        if (document.body.classList.contains('dark')) {
            themeBtn.textContent = '☀️';
        } else {
            themeBtn.textContent = '🌙';
        }
    });
});