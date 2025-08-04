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
    // Check if we're on a low-end device
    const isLowEnd = window.performanceSettings && window.performanceSettings.isLowEndDevice;

    // Add subtle hero animations (only if not a low-end device)
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        if (!isLowEnd) {
            // Add floating animation class
            // heroContent.classList.add('floating'); // Uncomment if you want to use floating animation

            // Add subtle pulse to CTA buttons
            const ctaButtons = heroContent.querySelectorAll('.btn');
            ctaButtons.forEach(button => {
                button.classList.add('pulse');
            });
        }

        // Always show the subheading, but use animation only on capable devices
        const subheading = heroContent.querySelector('.subheading');
        if (subheading) {
            if (isLowEnd) {
                // Immediately show without animation
                subheading.style.opacity = '1';
            } else {
                // Use animation with slight delay
                setTimeout(() => {
                    subheading.classList.add('reveal');
                }, 300);
            }
        }
    }

    // Add parallax effect to hero section (only if not a low-end device)
    if (!isLowEnd) {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            // Use passive event listener for better scroll performance
            window.addEventListener('scroll', function() {
                // Use requestAnimationFrame to optimize the scroll handler
                requestAnimationFrame(() => {
                    const scrollPosition = window.scrollY;
                    if (scrollPosition < window.innerHeight) {
                        const translateY = scrollPosition * 0.2;
                        heroSection.style.transform = `translateY(${translateY}px)`;
                    }
                });
            }, { passive: true });
        }
    }
}

// Set up fade-in animations that trigger when elements are in view
function setupFadeInAnimations() {
    // Check if we're on a low-end device
    const isLowEnd = window.performanceSettings && window.performanceSettings.isLowEndDevice;

    // For low-end devices, just make all elements visible immediately
    if (isLowEnd) {
        document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
            el.classList.add('visible');
            // Remove transitions for better performance
            el.style.transition = 'none';
        });
        return;
    }

    // Only set up if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback for browsers without IntersectionObserver
        document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
            el.classList.add('visible');
        });
        return;
    }

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
                // Limit the number of delayed animations for better performance
                const index = Array.from(
                    document.querySelectorAll('.fade-in-up')
                ).indexOf(entry.target);

                // Use a shorter delay and cap the maximum delay
                const delay = Math.min(index * 100, 500);

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

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
    // Skip particle creation for low-end devices
    if (window.performanceSettings && window.performanceSettings.isLowEndDevice) {
        return;
    }

    const container = document.getElementById('particles-container');
    if (!container) return;

    // Clear any existing particles
    container.innerHTML = '';

    // Create a limited number of particles for performance
    // Reduce count for better performance
    const particleCount = 8;
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