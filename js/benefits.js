// Benefits section animations and interactions
// This script only loads when the Benefits section is in view

// Initialize interactions for the Benefits section
(function() {
    // Set up benefit card animations
    setupBenefitCardAnimations();

    // Set up stat counter animations
    setupStatCounters();
})();

// Set up benefit card animations and interactions
function setupBenefitCardAnimations() {
    // Only set up once
    if (window.benefitCardsInitialized) return;
    window.benefitCardsInitialized = true;

    // Add hover effects to benefit cards
    document.querySelectorAll('.benefit-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle glow effect
            const cardIndex = Array.from(document.querySelectorAll('.benefit-card')).indexOf(this);
            let glowColor;

            if (cardIndex % 3 === 0) {
                glowColor = 'rgba(106, 226, 255, 0.2)'; // Cyan
            } else if (cardIndex % 3 === 1) {
                glowColor = 'rgba(164, 133, 255, 0.2)'; // Purple
            } else {
                glowColor = 'rgba(255, 102, 196, 0.2)'; // Pink
            }

            this.style.boxShadow = `0 15px 40px rgba(0, 0, 0, 0.3), 0 0 30px ${glowColor}`;
        });

        card.addEventListener('mouseleave', function() {
            // Reset to original state (CSS will handle this)
            this.style.boxShadow = '';
        });
    });
}



// Set up stat counter animations
function setupStatCounters() {
    const statElements = document.querySelectorAll('.benefit-stat');

    // Create observer for stat counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target;
                const targetValue = parseInt(statElement.getAttribute('data-value'));
                const duration = 2000; // 2 seconds
                const startTime = performance.now();

                // Only animate if we haven't already
                if (!statElement.classList.contains('counted')) {
                    statElement.classList.add('counted');

                    // Add a highlight effect to the stat when it starts counting
                    statElement.style.textShadow = '0 0 15px rgba(106, 226, 255, 0.5)';

                    // Remove the highlight effect after animation completes
                    setTimeout(() => {
                        statElement.style.textShadow = '';
                    }, duration + 300);

                    // Special case for the 0.05s stat
                    if (targetValue === 0) {
                        // For the 0.05s stat, we'll handle it differently
                        let currentText = '0.00';
                        statElement.textContent = currentText + 's';

                        // Animate from 0.00 to 0.05
                        let step = 0;
                        const totalSteps = 20; // 20 steps to reach 0.05

                        function updateDecimalCounter() {
                            step++;
                            const progress = step / totalSteps;
                            const easedProgress = 1 - Math.pow(1 - progress, 3);
                            const currentValue = (easedProgress * 0.05).toFixed(2);

                            statElement.textContent = currentValue + 's';

                            if (step < totalSteps) {
                                setTimeout(updateDecimalCounter, duration / totalSteps);
                            }
                        }

                        updateDecimalCounter();
                    } else {
                        // For percentage stats, animate as before
                        function updateCounter(currentTime) {
                            const elapsedTime = currentTime - startTime;
                            const progress = Math.min(elapsedTime / duration, 1);

                            // Easing function for smoother animation
                            const easedProgress = 1 - Math.pow(1 - progress, 3);

                            const currentValue = Math.floor(easedProgress * targetValue);
                            statElement.textContent = currentValue + '%';

                            if (progress < 1) {
                                requestAnimationFrame(updateCounter);
                            }
                        }

                        requestAnimationFrame(updateCounter);
                    }
                }

                observer.unobserve(statElement);
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe all stat elements
    statElements.forEach(el => {
        observer.observe(el);
    });
}
