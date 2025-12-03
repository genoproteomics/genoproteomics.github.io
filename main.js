/**
 * Genoproteomics - Main JavaScript
 * Version: 2.0
 * 
 * Handles:
 * - Mobile navigation toggle
 * - Smooth scrolling
 * - DNA particle generation
 * - Navbar scroll behavior
 * - Intersection Observer animations
 */

// ==========================================================================
// DOM Ready
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScroll();
    initDNAParticles();
    initScrollEffects();
    initIntersectionObserver();
});

// ==========================================================================
// Navigation
// ==========================================================================

/**
 * Initialize mobile navigation toggle and related functionality
 */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!navToggle || !navLinks) return;
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Update aria-expanded for accessibility
        const isExpanded = navLinks.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close mobile nav when a link is clicked
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnToggle = navToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ==========================================================================
// Smooth Scrolling
// ==========================================================================

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (!target) return;
            
            // Calculate offset (accounting for fixed navbar)
            const navbarHeight = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ==========================================================================
// DNA Particle Animation
// ==========================================================================

/**
 * Generate floating DNA particles in the hero background
 */
function initDNAParticles() {
    const dnaHelix = document.getElementById('dnaHelix');
    if (!dnaHelix) return;
    
    // Configuration
    const particleCount = 30;
    const colors = ['#00d4ff', '#7b2ff7', '#f72585', '#00ff88'];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const strand = document.createElement('div');
        strand.className = 'dna-strand';
        
        // Random properties
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 3 + Math.random() * 5;
        const left = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = 15 + Math.random() * 10;
        
        // Apply styles
        strand.style.cssText = `
            left: ${left}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            box-shadow: 0 0 ${10 + Math.random() * 10}px ${color};
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;
        
        dnaHelix.appendChild(strand);
    }
}

// ==========================================================================
// Scroll Effects
// ==========================================================================

/**
 * Initialize scroll-based effects (navbar background, etc.)
 */
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // Throttle scroll events for performance
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateNavbarOnScroll(navbar);
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial check
    updateNavbarOnScroll(navbar);
}

/**
 * Update navbar appearance based on scroll position
 * @param {HTMLElement} navbar - The navbar element
 */
function updateNavbarOnScroll(navbar) {
    const scrollY = window.scrollY || window.pageYOffset;
    
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
    }
}

// ==========================================================================
// Intersection Observer Animations
// ==========================================================================

/**
 * Initialize Intersection Observer for scroll-triggered animations
 */
function initIntersectionObserver() {
    // Check for browser support
    if (!('IntersectionObserver' in window)) {
        // Fallback: make all elements visible
        document.querySelectorAll('.stat-item, .process-step, .project-card').forEach(function(el) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
        return;
    }
    
    // Observer configuration
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Create observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animatedElements = document.querySelectorAll('.stat-item, .process-step, .project-card');
    
    animatedElements.forEach(function(el, index) {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        // Start observing
        observer.observe(el);
    });
}

// ==========================================================================
// Utility Functions
// ==========================================================================

/**
 * Debounce function to limit how often a function can fire
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit how often a function can fire
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

// ==========================================================================
// Optional: Add more interactive features
// ==========================================================================

/**
 * Parallax effect for background elements (optional enhancement)
 * Uncomment to enable
 */
/*
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', throttle(function() {
        const scrollY = window.pageYOffset;
        
        parallaxElements.forEach(function(el) {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            const offset = scrollY * speed;
            el.style.transform = `translateY(${offset}px)`;
        });
    }, 16));
}
*/

/**
 * Typing effect for hero text (optional enhancement)
 * Uncomment to enable
 */
/*
function initTypingEffect() {
    const element = document.querySelector('.hero-tagline');
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    element.style.visibility = 'visible';
    
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }
    
    // Start typing after a delay
    setTimeout(type, 1000);
}
*/

/**
 * Counter animation for stats (optional enhancement)
 * Uncomment to enable
 */
/*
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(function(counter) {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const hasPlus = target.includes('+');
    const numericValue = parseInt(target.replace(/[^0-9]/g, ''), 10);
    
    if (isNaN(numericValue)) return;
    
    let current = 0;
    const increment = numericValue / 50;
    const timer = setInterval(function() {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (isPercentage) displayValue += '%';
        if (hasPlus) displayValue += '+';
        element.textContent = displayValue;
    }, 30);
}
*/
