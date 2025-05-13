# Contact Form Setup Instructions

This document provides instructions on how to set up the contact form functionality using EmailJS.

## Overview

The contact form on the portfolio website uses [EmailJS](https://www.emailjs.com/) to send messages directly to your Gmail account (bitaniagezahegn3@gmail.com) without requiring a backend server.

## Setup Steps

### 1. Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and sign up for a free account
2. Verify your account through the email they send you

### 2. Connect Your Gmail Account

1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select "Gmail" as the service
4. Follow the instructions to connect your Gmail account (bitaniagezahegn3@gmail.com)
5. Name your service (e.g., "portfolio_contact_service")
6. Note down the **Service ID** for later use

### 3. Create an Email Template

1. In the EmailJS dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Design your email template with the following variables:
   - `{{user_name}}` - The name of the person contacting you
   - `{{user_email}}` - The email of the person contacting you
   - `{{subject}}` - The subject of the message
   - `{{message}}` - The message content
4. Here's a sample template:

```
Subject: New Contact Form Message: {{subject}}

Name: {{user_name}}
Email: {{user_email}}
Subject: {{subject}}

Message:
{{message}}
```

5. Save the template and note down the **Template ID**

### 4. Update Your Website Code

1. Open the file `js/contact.js`
2. Replace `YOUR_USER_ID_HERE` with your EmailJS User ID (found in Account > API Keys)
3. Replace `YOUR_SERVICE_ID` with the Service ID you noted earlier
4. Replace `YOUR_TEMPLATE_ID` with the Template ID you noted earlier

Example:

```javascript
// Initialize EmailJS with your user ID
function initEmailJS() {
    emailjs.init("YOUR_USER_ID_HERE"); // Replace with your actual User ID
}

// In the emailjs.send() function:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

Replace these with your actual values.

## Testing the Form

After setting up EmailJS:

1. Fill out the contact form on your website
2. Submit the form
3. Check your Gmail inbox to ensure you received the test message
4. Also check the EmailJS dashboard under "Email History" to see if the email was sent successfully

## Troubleshooting

If the form is not working:

1. Check the browser console for any JavaScript errors
2. Verify that your EmailJS account is active
3. Make sure you've entered the correct User ID, Service ID, and Template ID
4. Check if you've reached the free tier limits (200 emails per month)

## Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS JavaScript SDK](https://www.emailjs.com/docs/sdk/installation/)
