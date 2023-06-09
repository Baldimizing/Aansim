const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    score: {
        type: Number,
        default: 0
    }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;


