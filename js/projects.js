// Projects section animations and interactions
// This script only loads when the Projects section is in view

// Initialize interactions for the Projects section
(function() {
    // Set up project card animations
    setupProjectCardAnimations();
})();

// Set up project card animations and interactions
function setupProjectCardAnimations() {
    // Only set up once
    if (window.projectCardsInitialized) return;
    window.projectCardsInitialized = true;

    // Skip hover effects on low-end devices
    if (window.performanceSettings && window.performanceSettings.isLowEndDevice) {
        return;
    }

    // Use event delegation for better performance
    const projectsContainer = document.querySelector('.projects-grid');
    if (!projectsContainer) return;

    // Pre-calculate glow colors for each card
    const projectCards = document.querySelectorAll('.project-card');
    const glowColors = [];

    projectCards.forEach((card, index) => {
        let glowColor;
        if (index % 3 === 0) {
            glowColor = 'rgba(106, 226, 255, 0.2)'; // Cyan
        } else if (index % 3 === 1) {
            glowColor = 'rgba(164, 133, 255, 0.2)'; // Purple
        } else {
            glowColor = 'rgba(255, 102, 196, 0.2)'; // Pink
        }
        glowColors[index] = glowColor;

        // Store the index on the element for quick lookup
        card.dataset.cardIndex = index;
    });

    // Use a single event listener for all cards
    projectsContainer.addEventListener('mouseover', function(e) {
        const card = e.target.closest('.project-card');
        if (card) {
            const cardIndex = parseInt(card.dataset.cardIndex);
            const glowColor = glowColors[cardIndex];
            card.style.boxShadow = `0 15px 40px rgba(0, 0, 0, 0.3), 0 0 30px ${glowColor}`;
        }
    });

    projectsContainer.addEventListener('mouseout', function(e) {
        const card = e.target.closest('.project-card');
        if (card) {
            card.style.boxShadow = '';
        }
    });
}



// Create placeholder images for projects if needed
function createPlaceholderImage(index) {
    // Check if we're on a low-end device - use simpler placeholders
    const isLowEnd = window.performanceSettings && window.performanceSettings.isLowEndDevice;

    // Create a canvas element with reduced size for low-end devices
    const canvas = document.createElement('canvas');
    canvas.width = isLowEnd ? 300 : 600;
    canvas.height = isLowEnd ? 200 : 400;
    const ctx = canvas.getContext('2d');

    // Fill background with a dark color
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add some design elements based on the index
    let gradientColors;
    if (index % 3 === 0) {
        gradientColors = ['#6AE2FF', '#A485FF'];
    } else if (index % 3 === 1) {
        gradientColors = ['#A485FF', '#FF66C4'];
    } else {
        gradientColors = ['#FF66C4', '#6AE2FF'];
    }

    // For low-end devices, use a simpler placeholder
    if (isLowEnd) {
        // Just add the project number
        ctx.font = 'bold 60px Arial';
        ctx.fillStyle = '#ffffff33'; // White with 20% opacity
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`0${index + 1}`, canvas.width / 2, canvas.height / 2);

        // Add "Project" text
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#ffffff99'; // White with 60% opacity
        ctx.fillText('Project', canvas.width / 2, canvas.height / 2 + 30);
    } else {
        // Create a gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, gradientColors[0] + '33'); // 20% opacity
        gradient.addColorStop(1, gradientColors[1] + '33'); // 20% opacity
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add some geometric shapes
        ctx.fillStyle = gradientColors[0] + '66'; // 40% opacity
        ctx.beginPath();
        ctx.arc(canvas.width * 0.2, canvas.height * 0.3, 80, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = gradientColors[1] + '66'; // 40% opacity
        ctx.beginPath();
        ctx.arc(canvas.width * 0.8, canvas.height * 0.7, 100, 0, Math.PI * 2);
        ctx.fill();

        // Add project number text
        ctx.font = 'bold 120px Arial';
        ctx.fillStyle = '#ffffff22'; // White with 13% opacity
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`0${index + 1}`, canvas.width / 2, canvas.height / 2);

        // Add "Project" text
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = '#ffffff99'; // White with 60% opacity
        ctx.fillText('Project', canvas.width / 2, canvas.height / 2 + 60);
    }

    // Return the data URL with appropriate quality
    return canvas.toDataURL('image/jpeg', isLowEnd ? 0.7 : 0.9);
}
