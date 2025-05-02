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
    // Simple typing effect for hero headline
    const textElement = document.querySelector('.animate-text');
    if (textElement) {
        const originalText = textElement.textContent;
        textElement.textContent = '';
        
        // Simple typing animation that doesn't block rendering
        setTimeout(function() {
            let i = 0;
            function typeWriter() {
                if (i < originalText.length) {
                    textElement.textContent += originalText.charAt(i);
                    i++;
                    // Use requestAnimationFrame for better performance
                    if (i < originalText.length) {
                        setTimeout(typeWriter, 30);
                    }
                }
            }
            typeWriter();
        }, 500);
    }
} 