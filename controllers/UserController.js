const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');

// 회원가입
const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = new User({
    email,
    password: await bcrypt.hash(password, 20), // 비밀번호 해싱
  });

  try {
    await user.save();
    console.log('회원가입이 완료되었습니다.');
    res.status(StatusCodes.OK).json({ message: '회원가입이 완료되었습니다.' });
  } catch (err) {
    console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '회원가입에 실패했습니다.' });
  }
};

// 사용자 조회
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        console.log(users);
        res.status(StatusCodes.OK).json(users);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json( {message: '사용자 조회에 실패했습니다. '});
    }
};

// 로그인
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 데이터베이스에서 해당 이메일을 조회하고 비밀번호 확인
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('등록되지 않았거나 잘못된 이메일이 입력되었습니다.');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new Error('비밀번호가 일치하지 않습니다.');
        }

        res.status(StatusCodes.OK).json({ message: '로그인 성공'});
    }catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
    }
}

module.exports = {
  signup,
  getAllUsers,
  login,
};
