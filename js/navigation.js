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

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show');
            hamburger.classList.remove('active');

            // Remove active class from all links
            navLinks.forEach(lnk => lnk.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if(window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
