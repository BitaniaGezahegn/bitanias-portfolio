// About section animations and interactions
// This script only loads when the About section is in view

// Initialize interactions for the About section
(function() {
    // Set up skill tag interactions
    setupSkillTagInteractions();
    
    // Add minimal entrance animations if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        setupSimpleAnimations();
    }
})();

// Set up skill tag interactions
function setupSkillTagInteractions() {
    // Only set up once
    if (window.skillTagsInitialized) return;
    window.skillTagsInitialized = true;
    
    // Add optimized click effect to skill tags
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('click', function(e) {
            // Simple ripple effect with minimal DOM manipulation
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Calculate position
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            
            // Clean up after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Simple CSS transformations instead of GSAP
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.backgroundColor = '';
                }, 300);
            }, 100);
        });
    });
}

// Set up simple animations that only trigger when elements are in view
function setupSimpleAnimations() {
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Create observer
    const observer = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Add initial opacity and transition to fade-in elements if not already set by CSS
    document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
        if (getComputedStyle(el).opacity === '1') {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.transform = 'translateY(20px)';
        }
    });
    
    // Add visible class style if not in stylesheet
    const style = document.createElement('style');
    style.textContent = `
        .fade-in.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
} 