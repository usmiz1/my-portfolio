// ============================================
// Theme Toggle Functionality
// ============================================

// Get theme toggle buttons
const themeToggleNav = document.getElementById('themeToggleNav');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const themeIconNav = document.getElementById('themeIconNav');
const mobileThemeIcon = document.getElementById('mobileThemeIcon');

// Get current theme from localStorage or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle function
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

// Update theme icon
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        // Dark mode - show sun icon (to switch to light)
        if (themeIconNav) themeIconNav.className = 'fas fa-sun';
        if (mobileThemeIcon) mobileThemeIcon.className = 'fas fa-sun';
    } else {
        // Light mode - show moon icon (to switch to dark)
        if (themeIconNav) themeIconNav.className = 'fas fa-moon';
        if (mobileThemeIcon) mobileThemeIcon.className = 'fas fa-moon';
    }
}

// Add event listeners
if (themeToggleNav) {
    themeToggleNav.addEventListener('click', toggleTheme);
}
if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
}

// ============================================
// Navigation Active State
// ============================================

const navItems = document.querySelectorAll('.nav-item[data-nav]');
const sections = document.querySelectorAll('section[id]');

// Function to update active navigation item
function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-nav') === current) {
            item.classList.add('active');
        }
    });
}

// Update on scroll (handled in DOMContentLoaded section)

// Smooth scroll for navigation links
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('data-nav');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Scroll to Top Button
// ============================================

const scrollTopBtn = document.getElementById('scrollTop');

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Animate Progress Bars on Scroll
// ============================================

const progressBars = document.querySelectorAll('.progress-fill');

// Intersection Observer for progress bars
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const percent = progressBar.getAttribute('data-percent');
            progressBar.style.width = percent + '%';
            progressObserver.unobserve(progressBar);
        }
    });
}, {
    threshold: 0.5
});

// Observe all progress bars
progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// ============================================
// Fade In Animation on Scroll
// ============================================

const fadeElements = document.querySelectorAll('.skill-card, .project-card, .certificate-card, .contact-info-card, .contact-form-card');

// Intersection Observer for fade in
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Add fade-in class and observe elements
fadeElements.forEach(element => {
    element.classList.add('fade-in');
    fadeObserver.observe(element);
});

// ============================================
// Contact Form Handling
// ============================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: contactForm.querySelector('input[type="text"]').value,
        contact: contactForm.querySelectorAll('input[type="text"]')[1].value,
        email: contactForm.querySelector('input[type="email"]').value,
        message: contactForm.querySelector('textarea').value
    };
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message (you can customize this)
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Mobile Menu Functionality
// ============================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item[data-nav]');
const menuIcon = document.getElementById('menuIcon');

// Open mobile menu
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuOverlay.classList.add('active');
        menuIcon.className = 'fas fa-bars';
    });
}

// Close mobile menu
if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('active');
    });
}

// Close menu when clicking overlay
if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
        }
    });
}

// Handle mobile nav item clicks
mobileNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('data-nav');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu
            mobileMenuOverlay.classList.remove('active');
        }
    });
});

// Update mobile nav active state
function updateMobileActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    mobileNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-nav') === current) {
            item.classList.add('active');
        }
    });
}

// Update mobile nav on scroll
window.addEventListener('scroll', () => {
    updateActiveNav();
    updateMobileActiveNav();
});

// ============================================
// Initialize on Page Load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Update active nav on load
    updateActiveNav();
    updateMobileActiveNav();
    
    // Initialize progress bars (set to 0 initially)
    progressBars.forEach(bar => {
        bar.style.width = '0%';
    });
    
    // Add smooth transitions
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
});

// ============================================
// Handle Window Resize
// ============================================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate positions if needed
        updateActiveNav();
    }, 250);
});

