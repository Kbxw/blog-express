const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_USER, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})