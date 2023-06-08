const User = require('./models/User');

// 사용자 생성
const user = new User({
    email: 'wnguddl96@naver.com',
    password: '12345678'
});

user.save((err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('회원가입이 완료되었습니다.');
    }
});

// 사용자 조회
User.find({}, (err,users) => {
    if (err) {
        console.error(err);
    }else {
        console.log(users);
    }
})

