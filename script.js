// --- DOM Elements ---
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

// ==========================================
// 1. Mobile Responsive Menu Toggle
// ==========================================
menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark'); // Toggle hamburger to 'X' icon
    navbar.classList.toggle('active');    // Open/close menu
};

// ==========================================
// 2. Scroll Detection (Active Links & Sticky Header)
// ==========================================
window.onscroll = () => {
    const top = window.scrollY;

    // A. Highlighting the active navigation link based on scroll position
    sections.forEach(sec => {
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                // Adds 'active' class to matching link
                const targetLink = document.querySelector('header nav a[href*=' + id + ']');
                if (targetLink) {
                    targetLink.classList.add('active');
                }
            });
        }
    });

    // B. Make the header sticky after scrolling down 100px
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', top > 100);

    // C. Auto-close the mobile menu when scrolling
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

// ==========================================
// 3. Dynamic Typing Animation
// ==========================================
const roles = ["IC Student", "Bachelor of Science in Information System", "First Year", "Web Developer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeAnimation() {
    const typingTextElement = document.querySelector(".typing-text");
    if (!typingTextElement) return;

    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        // Remove one character
        typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Add one character
        typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    // Typing speed is faster when deleting than when writing
    let typingSpeed = isDeleting ? 70 : 150;

    // Logic to toggle between typing and deleting
    if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // Delay showing the complete word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length; // Move to the next word
        typingSpeed = 500; // Small delay before typing next word
    }

    setTimeout(typeAnimation, typingSpeed);
}

// Start typing animation once the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeAnimation, 800);
});