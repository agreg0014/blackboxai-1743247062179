const express = require('express');
const Rating = require('../models/Rating');
const router = express.Router();

// Submit a rating
router.post('/', async (req, res) => {
    const { student, chapter, rating } = req.body;
    const newRating = new Rating({ student, chapter, rating });

    try {
        await newRating.save();
        res.status(201).send('Rating submitted successfully');
    } catch (error) {
        res.status(400).send('Error submitting rating');
    }
});

// Get ratings for a specific chapter
router.get('/:chapterId', async (req, res) => {
    try {
        const ratings = await Rating.find({ chapter: req.params.chapterId });
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).send('Error retrieving ratings');
    }
});

module.exports = router;