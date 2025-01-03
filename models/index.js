const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('SampleModel', sampleSchema);
