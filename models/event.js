const mongoose = require('mongoose')
const { User } = require("./user");

const QandA = new mongoose.Schema({
    q: String,
    a: String
})

const EventSchema = new mongoose.Schema({
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
    attendees: {
        type: [String],
        required: true
    },
    image: {
        type: String,
        required: false
    },
    questions: {
        type: [QandA],
        required: true
    }
})
const Event = mongoose.model('Event', EventSchema);

module.exports = { Event }