// Password Protection for Client Resources Page
// Change the password below to your desired password
const CORRECT_PASSWORD = 'protagonist2026'; // CHANGE THIS PASSWORD

const passwordGate = document.getElementById('password-gate');
const protectedContent = document.getElementById('protected-content');
const passwordForm = document.getElementById('password-form');
const passwordInput = document.getElementById('password-input');
const errorMessage = document.getElementById('error-message');
const logoutBtn = document.getElementById('logout-btn');

// Check if user is already authenticated
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('resourcesAuthenticated');
    if (isAuthenticated === 'true') {
        showProtectedContent();
    }
}

// Show protected content
function showProtectedContent() {
    passwordGate.style.display = 'none';
    protectedContent.classList.remove('hidden');
}

// Show password gate
function showPasswordGate() {
    passwordGate.style.display = 'flex';
    protectedContent.classList.add('hidden');
}

// Handle form submission
passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const enteredPassword = passwordInput.value;

    if (enteredPassword === CORRECT_PASSWORD) {
        // Store authentication in session storage
        sessionStorage.setItem('resourcesAuthenticated', 'true');
        errorMessage.textContent = '';
        showProtectedContent();
    } else {
        // Show error message
        errorMessage.textContent = 'Incorrect password. Please try again.';
        passwordInput.value = '';
        passwordInput.focus();

        // Shake animation for error
        passwordGate.querySelector('.password-container').style.animation = 'shake 0.5s';
        setTimeout(() => {
            passwordGate.querySelector('.password-container').style.animation = '';
        }, 500);
    }
});

// Handle logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('resourcesAuthenticated');
        showPasswordGate();
        passwordInput.value = '';
        errorMessage.textContent = '';
    });
}

// Add shake animation to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Check authentication on page load
checkAuth();
