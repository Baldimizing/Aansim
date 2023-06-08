const express = require('express');
const mongoose = require('mongoose');
const port = 3000;

const app = express();

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;

mongoose.connect('mongodb://localhost/aansim-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// 라우트 설정
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// 서버 시작
app.listen(3000, () => {
    console.log(`Server started on port ${port}`);
});
