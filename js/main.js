// Main JavaScript file with performance optimization

// Initialize on document load
document.addEventListener('DOMContentLoaded', function() {
    // Navigation is now directly loaded in HTML
    // No need to load it dynamically

    // Setup scroll indicator functionality
    setupScrollIndicator();

    // Lazy load animations only when needed
    lazyLoadResources();

    // Handle basic interactions
    setupBasicInteractions();

    // Setup fade-in animations
    setupFadeInAnimations();

    // Create particles for hero section
    createParticles();
});

// Set up scroll indicator to navigate to the About section
function setupScrollIndicator() {
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();

            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                // Calculate offset to account for fixed navbar
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                // Perform the smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });

        // Add bounce class instead of using GSAP
        const scrollSvg = scrollIndicator.querySelector('svg');
        if (scrollSvg) {
            scrollSvg.classList.add('bounce');
        }
    }
}

// Lazy load scripts and resources
function lazyLoadResources() {
    // Use Intersection Observer to detect when elements are in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If section is in view, load its scripts
                if (entry.target.id === 'about') {
                    loadScript('js/about.js');
                }

                // Unobserve after loading
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Helper function to load scripts dynamically
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

// Set up basic interactions without heavy animations
function setupBasicInteractions() {
    // Add subtle hero animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // Add floating animation class
        heroContent.classList.add('floating');

        // Add reveal animation to subheading with slight delay
        const subheading = heroContent.querySelector('.subheading');
        if (subheading) {
            setTimeout(() => {
                subheading.classList.add('reveal');
            }, 300);
        }

        // Add subtle pulse to CTA buttons
        const ctaButtons = heroContent.querySelectorAll('.btn');
        ctaButtons.forEach(button => {
            button.classList.add('pulse');
        });
    }

    // Add parallax effect to hero section
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                const translateY = scrollPosition * 0.2;
                heroSection.style.transform = `translateY(${translateY}px)`;
            }
        });
    }
}

// Set up fade-in animations that trigger when elements are in view
function setupFadeInAnimations() {
    // Only set up if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) return;

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    // Create observer for fade-in elements
    const fadeObserver = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        fadeObserver.observe(el);
    });

    // Create observer for fade-in-up elements with staggered delay
    const fadeUpObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a slight delay between each card animation
                const index = Array.from(
                    document.querySelectorAll('.fade-in-up')
                ).indexOf(entry.target);

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); // 150ms delay between each card

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements with fade-in-up class
    document.querySelectorAll('.fade-in-up').forEach(el => {
        fadeUpObserver.observe(el);
    });
}

// Create floating particles in the hero section
function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    // Clear any existing particles
    container.innerHTML = '';

    // Create a limited number of particles for performance
    const particleCount = 15;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    for (let i = 0; i < particleCount; i++) {
        // Create particle with random properties
        const particle = document.createElement('div');

        // Alternate between particle types
        const particleType = i % 3 + 1;
        particle.className = `particle particle-${particleType}`;

        // Random starting position
        const startX = Math.random() * viewportWidth;
        const startY = Math.random() * viewportHeight;

        // Random ending position (for animation)
        const endX = (Math.random() - 0.5) * 200;
        const endY = (Math.random() - 0.5) * 200;

        // Set CSS variables for the animation
        particle.style.setProperty('--x', `${endX}px`);
        particle.style.setProperty('--y', `${endY}px`);

        // Set initial position
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;

        // Add random delay to animation
        particle.style.animationDelay = `${Math.random() * 5}s`;

        // Add to container
        container.appendChild(particle);
    }
}