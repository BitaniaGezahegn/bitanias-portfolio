// Services section animations and interactions
// This script only loads when the Services section is in view

// Initialize interactions for the Services section
(function() {
    // Set up service card animations
    setupServiceCardAnimations();
})();

// Set up service card animations and interactions
function setupServiceCardAnimations() {
    // Only set up once
    if (window.serviceCardsInitialized) return;
    window.serviceCardsInitialized = true;

    // Skip hover effects on low-end devices
    if (window.performanceSettings && window.performanceSettings.isLowEndDevice) {
        return;
    }

    // Add hover effects to service cards - use event delegation for better performance
    const servicesContainer = document.querySelector('.services-grid');
    if (!servicesContainer) return;

    // Use a single event listener instead of one per card
    servicesContainer.addEventListener('mouseover', function(e) {
        const card = e.target.closest('.service-card');
        if (card) {
            // Add subtle glow effect
            card.style.boxShadow = `0 15px 40px rgba(0, 0, 0, 0.3),
                                   0 0 30px ${getCardGlowColor(card)}`;
        }
    });

    servicesContainer.addEventListener('mouseout', function(e) {
        const card = e.target.closest('.service-card');
        if (card) {
            // Reset to original state (CSS will handle this)
            card.style.boxShadow = '';
        }
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


