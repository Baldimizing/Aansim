const User = require('./models/User');

// 회원가입
const signup = (req, res) => {
  const { email, password } = req.body;
  const user = new User({
    email,
    password,
  });

  user.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: '회원가입에 실패했습니다.' });
    } else {
      console.log('회원가입이 완료되었습니다.');
      res.status(200).json({ message: '회원가입이 완료되었습니다.' });
    }
  });
};

// 사용자 조회
const getAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: '사용자 조회에 실패했습니다.' });
    } else {
      console.log(users);
      res.status(200).json(users);
    }
  });
};

module.exports = {
  signup,
  getAllUsers,
};
