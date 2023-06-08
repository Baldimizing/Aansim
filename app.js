const express = require('express');
const mongoose = require('mongoose');
const port = 3000;

const app = express();

// json 파싱 미들웨어
app.use(express.json());

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;

mongoose.connect('mongodb://localhost/aansim-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB 연결 성공');
}).catch((err) => {
    console.error('MongoDB 연결 실패', err);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('MongoDB 연결 성공');
});

// 라우트 설정
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// 서버 시작
app.listen(3000, () => {
    console.log(`Server started on port ${port}`);
});
