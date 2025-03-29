const express = require('express');
const Form = require('../models/Form');
const router = express.Router();

// Create a new form
router.post('/', async (req, res) => {
    const { title, fields, createdBy } = req.body;
    const newForm = new Form({ title, fields, createdBy });

    try {
        await newForm.save();
        res.status(201).send('Form created successfully');
    } catch (error) {
        res.status(400).send('Error creating form');
    }
});

// Get all forms
router.get('/', async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).send('Error retrieving forms');
    }
});

module.exports = router;