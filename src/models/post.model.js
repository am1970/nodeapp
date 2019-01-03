let mongoose = require('mongoose');

const server = 'localhost:27017';
const database = 'nodeapp';
const user = 'root';
const password = ' ';

// mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`, { useNewUrlParser: true });
mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true });

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