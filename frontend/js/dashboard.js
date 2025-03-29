// Dashboard functionality
document.addEventListener('DOMContentLoaded', () => {
    // Get user info from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    // If no token or user info, redirect to login
    if (!token || !user) {
        window.location.href = '/login.html';
        return;
    }

    // Display user info in the header
    const userInfoElement = document.getElementById('user-info');
    if (userInfoElement) {
        userInfoElement.textContent = `${user.username} (${user.role})`;
    }

    // Show appropriate dashboard based on user role
    const adminDashboard = document.getElementById('admin-dashboard');
    const teacherDashboard = document.getElementById('teacher-dashboard');
    const studentDashboard = document.getElementById('student-dashboard');

    // Hide all dashboards first
    if (adminDashboard) adminDashboard.classList.add('hidden');
    if (teacherDashboard) teacherDashboard.classList.add('hidden');
    if (studentDashboard) studentDashboard.classList.add('hidden');

    // Show appropriate dashboard
    switch (user.role) {
        case 'admin':
            if (adminDashboard) adminDashboard.classList.remove('hidden');
            loadAdminDashboard();
            break;
        case 'teacher':
            if (teacherDashboard) teacherDashboard.classList.remove('hidden');
            loadTeacherDashboard();
            break;
        case 'student':
            if (studentDashboard) studentDashboard.classList.remove('hidden');
            loadStudentDashboard();
            break;
        default:
            console.error('Unknown user role');
            break;
    }
});

// Load admin dashboard data
async function loadAdminDashboard() {
    try {
        // Example: Fetch users count, courses count, etc.
        const response = await fetch('/api/admin/stats', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const stats = await response.json();
        // Update UI with stats
    } catch (error) {
        console.error('Error loading admin dashboard:', error);
    }
}

// Load teacher dashboard data
async function loadTeacherDashboard() {
    try {
        // Example: Fetch teacher's courses, students, etc.
        const response = await fetch('/api/teacher/courses', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const courses = await response.json();
        // Update UI with courses
    } catch (error) {
        console.error('Error loading teacher dashboard:', error);
    }
}

// Load student dashboard data
async function loadStudentDashboard() {
    try {
        // Example: Fetch enrolled courses, assignments, etc.
        const response = await fetch('/api/student/courses', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const courses = await response.json();
        // Update UI with courses
    } catch (error) {
        console.error('Error loading student dashboard:', error);
    }
}

// Event Listeners for Dashboard Actions

// Admin Actions
document.querySelectorAll('.admin-action').forEach(button => {
    button.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        switch (action) {
            case 'manage-users':
                window.location.href = '/admin/users.html';
                break;
            case 'manage-courses':
                window.location.href = '/admin/courses.html';
                break;
            case 'system-settings':
                window.location.href = '/admin/settings.html';
                break;
        }
    });
});

// Teacher Actions
document.querySelectorAll('.teacher-action').forEach(button => {
    button.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        switch (action) {
            case 'my-courses':
                window.location.href = '/teacher/courses.html';
                break;
            case 'assignments':
                window.location.href = '/teacher/assignments.html';
                break;
            case 'discussions':
                window.location.href = '/teacher/discussions.html';
                break;
        }
    });
});

// Student Actions
document.querySelectorAll('.student-action').forEach(button => {
    button.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        switch (action) {
            case 'my-courses':
                window.location.href = '/student/courses.html';
                break;
            case 'assignments':
                window.location.href = '/student/assignments.html';
                break;
            case 'progress':
                window.location.href = '/student/progress.html';
                break;
        }
    });
});