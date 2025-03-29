const express = require('express');
const Doubt = require('../models/Doubt');
const router = express.Router();

// Submit a doubt
router.post('/', async (req, res) => {
    const { student, chapter, doubtText } = req.body;
    const newDoubt = new Doubt({ student, chapter, doubtText });

    try {
        await newDoubt.save();
        res.status(201).send('Doubt submitted successfully');
    } catch (error) {
        res.status(400).send('Error submitting doubt');
    }
});

// Get doubts for a specific chapter
router.get('/:chapterId', async (req, res) => {
    try {
        const doubts = await Doubt.find({ chapter: req.params.chapterId });
        res.status(200).json(doubts);
    } catch (error) {
        res.status(500).send('Error retrieving doubts');
    }
});

module.exports = router;