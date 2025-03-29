const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    fields: [{
        fieldName: {
            type: String,
            required: true
        },
        fieldType: {
            type: String,
            enum: ['text', 'dropdown', 'checkbox'],
            required: true
        },
        options: [{
            type: String
        }],
        required: {
            type: Boolean,
            default: false
        }
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Form', formSchema);