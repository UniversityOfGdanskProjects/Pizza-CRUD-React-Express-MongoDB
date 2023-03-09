const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');
const timestamp = require('mongoose-timestamp');

// autoIncrement.initialize(mongoose.connection);

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
        match: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    }
});

// commentSchema.plugin(autoIncrement.plugin, {
//   model: 'Comment',
//   field: 'id',
//   startAt: 1,
//   incrementBy: 1
// });

commentSchema.plugin(timestamp);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;