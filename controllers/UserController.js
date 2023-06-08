const User = require('../models/user');

// 회원가입
const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = new User({
    email,
    password,
  });

  try {
    await user.save();
    console.log('회원가입이 완료되었습니다.');
    res.status(200).json({ message: '회원가입이 완료되었습니다.' });
  } catch (err) {
    console.error(err);
      res.status(500).json({ message: '회원가입에 실패했습니다.' });
  }
};

// 사용자 조회
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        console.log(users);
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json( {message: '사용자 조회에 실패했습니다. '});
    }
};

module.exports = {
  signup,
  getAllUsers,
};
