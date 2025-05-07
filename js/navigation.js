// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('show');
        hamburger.classList.toggle('active');
    });

    // Use event delegation for nav links instead of multiple listeners
    const navMenuElement = document.getElementById('nav-menu');
    if (navMenuElement) {
        navMenuElement.addEventListener('click', function(e) {
            // Check if the clicked element is a navigation link
            if (e.target.tagName === 'A') {
                // Close mobile menu
                navMenu.classList.remove('show');
                hamburger.classList.remove('active');

                // Remove active class from all links
                navLinks.forEach(lnk => lnk.classList.remove('active'));

                // Add active class to clicked link
                e.target.classList.add('active');
            }
        });
    }

    // Optimize scroll handler with throttling
    let isScrolling = false;
    let scrollTimeout;
    const sections = document.querySelectorAll('section');

    // Check if we're on a low-end device
    const isLowEnd = window.performanceSettings && window.performanceSettings.isLowEndDevice;

    // Use a less frequent scroll check for low-end devices
    const scrollThrottleTime = isLowEnd ? 300 : 100;

    window.addEventListener('scroll', function() {
        // Skip if already processing a scroll event
        if (isScrolling) return;

        isScrolling = true;

        // Clear previous timeout
        clearTimeout(scrollTimeout);

        // Use requestAnimationFrame for better performance
        requestAnimationFrame(function() {
            let current = '';

            // Cache window.scrollY to avoid multiple property lookups
            const scrollY = window.scrollY;

            // Find the current section
            sections.forEach(section => {
                const sectionTop = section.offsetTop;

                if(scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            // Update active link only if we have a current section
            if (current) {
                navLinks.forEach(link => {
                    // Use classList.contains for better performance
                    if (link.classList.contains('active')) {
                        link.classList.remove('active');
                    }

                    if(link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            }

            // Set timeout to allow another scroll check
            scrollTimeout = setTimeout(function() {
                isScrolling = false;
            }, scrollThrottleTime);
        });
    }, { passive: true }); // Use passive event listener for better scroll performance
});
