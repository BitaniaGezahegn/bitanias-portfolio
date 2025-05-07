// Services section animations and interactions
// This script only loads when the Services section is in view

// Initialize interactions for the Services section
(function() {
    // Set up service card animations
    setupServiceCardAnimations();
    
    // Add entrance animations if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        setupFadeInAnimations();
    }
})();

// Set up service card animations and interactions
function setupServiceCardAnimations() {
    // Only set up once
    if (window.serviceCardsInitialized) return;
    window.serviceCardsInitialized = true;
    
    // Add hover effects to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle glow effect
            this.style.boxShadow = `0 15px 40px rgba(0, 0, 0, 0.3), 
                                   0 0 30px ${getCardGlowColor(this)}`;
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset to original state (CSS will handle this)
            this.style.boxShadow = '';
        });
    });
}

// Helper function to get the appropriate glow color based on card class
function getCardGlowColor(card) {
    if (card.classList.contains('wordpress-card')) {
        return 'rgba(255, 102, 196, 0.2)';
    } else if (card.classList.contains('hosting-card')) {
        return 'rgba(106, 226, 255, 0.2)';
    } else if (card.classList.contains('webdesign-card')) {
        return 'rgba(164, 133, 255, 0.2)';
    } else if (card.classList.contains('seo-card')) {
        return 'rgba(255, 102, 196, 0.2)';
    } else if (card.classList.contains('performance-card')) {
        return 'rgba(106, 226, 255, 0.2)';
    } else {
        return 'rgba(255, 255, 255, 0.1)';
    }
}

// Set up fade-in animations that trigger when elements are in view
function setupFadeInAnimations() {
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a slight delay between each card animation
                const index = Array.from(
                    document.querySelectorAll('.fade-in-up')
                ).indexOf(entry.target);
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); // 100ms delay between each card
                
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Create observer
    const observer = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements with fade-in-up class
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
}
