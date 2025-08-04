// Navigation JavaScript with updated sections

// Variables to track scroll position and direction
let lastScrollTop = 0;
let scrollThreshold = 50;
let navbarHeight;

// Initialize navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    navbarHeight = navbar.offsetHeight;
    
    // Handle navbar visibility on scroll
    handleScroll();
    
    // Setup active navigation highlighting
    setupActiveNavHighlighting();
    
    // Setup smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Setup scroll progress indicator
    setupScrollProgress();
    
    // Set home as active by default when page loads
    setHomeAsDefault();
}

// Set home as the default active navigation item
function setHomeAsDefault() {
    // Get current URL hash
    const hash = window.location.hash;
    
    // If there's no hash or we're at the top of the page, activate home link
    if (!hash || window.scrollY < 50) {
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => link.classList.remove('active'));
        
        const homeLink = document.querySelector('.nav-links a[href="#hero"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
}

// Set up scroll progress indicator
function setupScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        // Calculate scroll progress as percentage
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        // Update progress bar width
        progressBar.style.width = `${scrollPercent}%`;
    }, { passive: true });
}

// Set up smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor behavior
            e.preventDefault();
            
            // Get the target section id from the href
            const targetId = this.getAttribute('href');
            
            // Only proceed if it's an internal anchor link
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Calculate offset to account for fixed navbar
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 10; // Add extra 10px padding
                    
                    // Perform the smooth scroll
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page jump (optional)
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
}

// Handle scroll events
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Check if we've scrolled past the threshold
        if (Math.abs(lastScrollTop - scrollTop) <= scrollThreshold) return;
        
        // Show navbar when scrolling up
        if (scrollTop < lastScrollTop) {
            navbar.classList.remove('hidden');
        } 
        // Hide navbar when scrolling down AND we've scrolled past hero
        else if (scrollTop > lastScrollTop && scrollTop > navbarHeight * 2) {
            navbar.classList.add('hidden');
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true }); // Use passive listener for better performance
}

// Setup function to highlight active navigation section
function setupActiveNavHighlighting() {
    // Disabled to prevent conflicts with the direct fix in index.html
    return;
    
    // Original code below, but not executing
    /*
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Only proceed if we have sections and navigation links
    if (!sections.length || !navLinks.length) return;
    
    // Add scroll event listener to highlight active section
    window.addEventListener('scroll', highlightActiveSection, { passive: true });
    
    // Add click event listener to immediately update active class
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to the clicked link
            this.classList.add('active');
        });
    });
    
    // Initial call to set active section on page load
    highlightActiveSection();
    
    function highlightActiveSection() {
        // Get current scroll position
        const scrollY = window.pageYOffset;
        
        // Track if any section is active
        let foundActive = false;
        
        // Loop through sections to find the current one
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for better UX
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Check if we're in this section
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const correspondingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                    foundActive = true;
                }
            }
        });
        
        // If no section is active (like at the very top before any section),
        // we don't want any nav item highlighted
        if (!foundActive) {
            navLinks.forEach(link => link.classList.remove('active'));
        }
    }
    */
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initNavigation);

// Also initialize if this script is loaded after DOM is already ready
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initNavigation, 1);
} 