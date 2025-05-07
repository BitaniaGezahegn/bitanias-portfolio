// Contact section animations and interactions
// This script handles form submission and animations

// Initialize interactions for the Contact section
(function() {
    // Set up form animations and validation
    setupContactForm();
    // Set up CTA buttons to focus on contact form
    setupContactCTAButtons();
})();

// Set up contact form validation and submission
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    const successMessage = document.querySelector('.form-success-message');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form fields
        const nameField = contactForm.querySelector('input[name="name"]');
        const emailField = contactForm.querySelector('input[name="email"]');
        const messageField = contactForm.querySelector('textarea[name="message"]');

        // Simple validation
        if (!nameField.value.trim()) {
            showFieldError(nameField, 'Please enter your name');
            return;
        }

        if (!isValidEmail(emailField.value.trim())) {
            showFieldError(emailField, 'Please enter a valid email address');
            return;
        }

        if (!messageField.value.trim()) {
            showFieldError(messageField, 'Please enter your message');
            return;
        }

        // Simulate form submission (in a real scenario, you'd send data to the server)
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';

        // Simulate server delay
        setTimeout(() => {
            // Hide the form and show success message
            contactForm.style.display = 'none';
            if (successMessage) {
                successMessage.classList.add('visible');
            }

            // Reset form for future submissions
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = 'Send Message';
        }, 1500);
    });

    // Add focus effects to form fields
    const formFields = contactForm.querySelectorAll('input, textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        field.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');

            // Remove error state when user starts typing again
            this.classList.remove('error');
            const errorMessage = this.parentElement.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    });
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show field error
function showFieldError(field, message) {
    // Remove any existing error messages
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Add error class to field
    field.classList.add('error');

    // Create and append error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    field.parentElement.appendChild(errorMessage);

    // Focus the field
    field.focus();
}

// Set up CTA buttons to focus on the name input in contact form
function setupContactCTAButtons() {
    // Get all CTA buttons that link to the contact section
    const ctaButtons = document.querySelectorAll('a[href="#contact"]');

    // Get the name input field from the contact form
    const nameInput = document.querySelector('.contact-form input[name="name"]');

    if (!ctaButtons.length || !nameInput) return;

    // Add click event listener to each CTA button
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // The default browser behavior will scroll to the contact section
            // We just need to add a small delay to focus the name input after scrolling
            setTimeout(() => {
                nameInput.focus();
            }, 500); // 500ms delay to ensure the scroll has completed
        });
    });
}


