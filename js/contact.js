// Contact section animations and interactions
// This script handles form submission and animations

// Initialize interactions for the Contact section
(function() {
    // Initialize EmailJS
    initEmailJS();

    // Set up form animations and validation
    setupContactForm();

    // Set up CTA buttons to focus on contact form
    setupContactCTAButtons();
})();

// Initialize EmailJS with your user ID
function initEmailJS() {
    // Initialize EmailJS with your user ID
    // You need to sign up at https://www.emailjs.com/ and get your user ID
    emailjs.init("T1Oy1fbJAp57Xppx5");
}

// Set up contact form validation and submission
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.querySelector('.form-success-message');
    const submitButton = document.getElementById('submit-btn');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form fields
        const nameField = document.getElementById('user_name');
        const emailField = document.getElementById('user_email');
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');

        // Simple validation
        if (!nameField.value.trim()) {
            showFieldError(nameField, 'Please enter your name');
            return;
        }

        if (!isValidEmail(emailField.value.trim())) {
            showFieldError(emailField, 'Please enter a valid email address');
            return;
        }

        if (!subjectField.value.trim()) {
            showFieldError(subjectField, 'Please enter a subject');
            return;
        }

        if (!messageField.value.trim()) {
            showFieldError(messageField, 'Please enter your message');
            return;
        }

        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';
        showFormStatus('loading', 'Sending your message...');

        // Prepare template parameters
        const templateParams = {
            user_name: nameField.value.trim(),
            user_email: emailField.value.trim(),
            subject: subjectField.value.trim(),
            message: messageField.value.trim()
        };

        // Send email using EmailJS
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
        emailjs.send('service_fsifcco', 'template_kxh223h', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);

                // Show success message
                showFormStatus('success', 'Your message has been sent successfully!');

                // Hide the form and show success message after a delay
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    if (successMessage) {
                        successMessage.classList.add('visible');
                    }
                }, 1500);

                // Reset form
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send Message';
            }, function(error) {
                console.log('FAILED...', error);

                // Show error message
                showFormStatus('error', 'Failed to send message. Please try again later or contact me directly via email.');

                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send Message';
            });
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

        // Also clear form status when user starts typing
        field.addEventListener('input', function() {
            clearFormStatus();
        });
    });
}

// Helper function to show form status messages
function showFormStatus(type, message) {
    const formStatus = document.getElementById('form-status');
    if (!formStatus) return;

    // Clear any existing status
    formStatus.className = 'form-status';

    // Add the appropriate class and message
    formStatus.classList.add(type);
    formStatus.textContent = message;
}

// Helper function to clear form status
function clearFormStatus() {
    const formStatus = document.getElementById('form-status');
    if (!formStatus) return;

    formStatus.className = 'form-status';
    formStatus.textContent = '';
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
    const nameInput = document.getElementById('user_name');

    if (!ctaButtons.length || !nameInput) return;

    // Add click event listener to each CTA button
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // The default browser behavior will scroll to the contact section
            // We just need to add a small delay to focus the name input after scrolling
            setTimeout(() => {
                nameInput.focus();
            }, 500); // 500ms delay to ensure the scroll has completed
        });
    });
}


