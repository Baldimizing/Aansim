const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userRoutes = require('./routes/userRoutes');
const HttpStatus = require('http-status-codes');
const User = require('./models/user');

const port = 3000;
const app = express();

// json 파싱 미들웨어
app.use(express.json());


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
app.use('/users', userRoutes);

// 미들웨어 에러 핸들링
app.use((err, req, res, next) => {
    console.error(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json( {message: 'Internal Server Error'});
    next(err); // 다음 미들웨어로 에러 전달
})

// '/api/signup' 라우터
const signupRouter = require('./api/signup');
app.user('/api/signup', signupRouter);

// '/api/login' 라우터
const loginRouter = require('./api/login');
app.user('/api/login', loginRouter);

// 서버 시작
app.listen(3000, () => {
    console.log(`Server started on port ${port}`);
});