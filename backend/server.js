const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// In-memory store for development
global.users = [];
global.courses = [];
global.ratings = [];
global.doubts = [];
global.forms = [];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Import routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const ratingRoutes = require('./routes/ratings');
const doubtRoutes = require('./routes/doubts');
const uploadRoutes = require('./routes/uploads');
const formRoutes = require('./routes/forms');

// Error handling middleware
const errorHandler = require('./middlewares/errorHandler');
const authMiddleware = require('./middlewares/authMiddleware');

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', authMiddleware, courseRoutes);
app.use('/api/ratings', authMiddleware, ratingRoutes);
app.use('/api/doubts', authMiddleware, doubtRoutes);
app.use('/api/uploads', authMiddleware, uploadRoutes);
app.use('/api/forms', authMiddleware, formRoutes);

// Serve frontend routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/register.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dashboard.html'));
});

// Catch-all route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Frontend files being served from:', path.join(__dirname, '../frontend'));
});