const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const commentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
});


commentSchema.plugin(timestamp);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;