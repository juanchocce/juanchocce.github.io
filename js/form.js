/**
 * Contact Form Manager
 * Handles validation, honeypot, and mock submission.
 */

export function initForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', handleSubmit);
}

async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    // Honeypot check
    const honey = form.querySelector('input[name="bot-field"]');
    if (honey && honey.value) {
        console.log('Bot detected');
        return;
    }

    // Basic Validation (HTML5 handles most, but we can add custom here)
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    try {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Mock API Call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success Feedback
        showMessage(form, 'Message sent successfully!', 'success');
        form.reset();
    } catch (error) {
        showMessage(form, 'Failed to send message.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

function showMessage(form, msg, type) {
    const msgDiv = form.querySelector('.form-message') || document.createElement('div');
    msgDiv.className = `form-message ${type}`;
    msgDiv.textContent = msg;
    msgDiv.style.marginTop = '1rem';
    msgDiv.style.color = type === 'success' ? '#10b981' : '#ef4444';

    if (!form.contains(msgDiv)) {
        form.appendChild(msgDiv);
    }

    setTimeout(() => msgDiv.remove(), 5000);
}
