const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

// Create a new course
router.post('/', async (req, res) => {
    const { title, chapters, createdBy } = req.body;
    const newCourse = new Course({ title, chapters, createdBy });

    try {
        await newCourse.save();
        res.status(201).send('Course created successfully');
    } catch (error) {
        res.status(400).send('Error creating course');
    }
});

// Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).send('Error retrieving courses');
    }
});

// Get a specific course by ID
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).send('Course not found');
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).send('Error retrieving course');
    }
});

module.exports = router;