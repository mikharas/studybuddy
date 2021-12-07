const mongoose = require('mongoose');

const mongoURI = process.env.REACT_APP_MONGODB_URI || 'mongodb://localhost:27017/StudyBuddyAPI'

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true});

module.exports = { mongoose }