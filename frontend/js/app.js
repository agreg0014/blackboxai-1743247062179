// Central JavaScript file for common functions and AJAX setup

// Function to handle AJAX requests
async function ajaxRequest(url, method, data) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: data ? JSON.stringify(data) : null
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Request failed');
        }

        return result;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
}

// Authentication functions
async function register(username, email, password, role = 'student') {
    try {
        const result = await ajaxRequest('/api/auth/register', 'POST', {
            username,
            email,
            password,
            role
        });

        // Store token and user info
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));

        // Redirect based on role
        redirectBasedOnRole(result.user.role);
    } catch (error) {
        showError('Registration failed: ' + error.message);
    }
}

async function login(email, password) {
    try {
        const result = await ajaxRequest('/api/auth/login', 'POST', {
            email,
            password
        });

        // Store token and user info
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));

        // Redirect based on role
        redirectBasedOnRole(result.user.role);
    } catch (error) {
        showError('Login failed: ' + error.message);
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login.html';
}

// Helper functions
function redirectBasedOnRole(role) {
    switch (role) {
        case 'admin':
            window.location.href = '/dashboard.html?type=admin';
            break;
        case 'teacher':
            window.location.href = '/dashboard.html?type=teacher';
            break;
        case 'student':
            window.location.href = '/dashboard.html?type=student';
            break;
        default:
            window.location.href = '/dashboard.html';
    }
}

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    } else {
        alert(message);
    }
}

// Event Listeners for Forms
document.addEventListener('DOMContentLoaded', () => {
    // Registration Form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            await register(username, email, password, role);
        });
    }

    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            await login(email, password);
        });
    }

    // Logout Button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
});

// Check authentication status on page load
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // If no token, redirect to login
    if (!token && !window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
        window.location.href = '/login.html';
        return;
    }

    // If token exists and user is on login/register page, redirect to dashboard
    if (token && (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html'))) {
        redirectBasedOnRole(user.role);
    }
}

// Run authentication check
checkAuth();