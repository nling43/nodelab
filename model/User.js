const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        min: 1,
        max: 255
    },
    age: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('User', userSchema)