const mongoose = require('mongoose')

const Event = mongoose.model('Event', {
    title: {
        type: String,
        required: true,
        minlength: 1
    },
    description: {
        type: String,
        required: true,
        minlength: 1
    },
    host: {
        type: String,
        required: true,
    },
    location: {
        type: Object,
        required: true
    },
    maxSpots: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true,
        minlength: 1
    },
    attendees: {
        type: [String],
        required: true
    }
})

module.exports = { Event }