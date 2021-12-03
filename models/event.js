const mongoose = require('mongoose')
const { User } = require("./user");

const Event = mongoose.model('Event', {
    id: {
        type: String,
        required: true
    },
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
        minlength: 1
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
    // attendees: {
    //     type: [User],
    //     required: true
    // }
})

module.exports = { Event }