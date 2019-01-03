let mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Post', PostSchema);