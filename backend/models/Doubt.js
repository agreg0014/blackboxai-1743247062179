const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course.chapters',
        required: true
    },
    doubtText: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'resolved'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Doubt', doubtSchema);