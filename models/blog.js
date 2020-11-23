const mongoose = require('mongoose')

const Blog = mongoose.model('Blog', {
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true,
    }
})


module.exports = Blog