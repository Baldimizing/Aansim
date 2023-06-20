const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const { validateRequest } = require('../security/requestValidation');
const { generateToken } = require('../security/jwtUtil');
const authenticateToken = require('../security/authenticateToken');
const passwordPolicy = require('../security/passwordPolicy');
const requestValidation = require('../security/requestValidation');
const logger = require('../security/logger');

// 로그인 라우터
router.post(
  '/',
  [
    requestValidation.validateBody('email').isEmail(),
    requestValidation.validateBody('password').notEmpty(),
    passwordPolicy.checkPasswordPolicy,
  ],
  authenticateToken, // authenticateToken 미들웨어 추가
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // 이메일로 사용자 조회
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: '등록되지 않은 이메일입니다.' });
      }

      // 비밀번호 일치 여부 확인
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: '비밀번호가 일치하지 않습니다.' });
      }

      // jwt 토큰 생성
      const token = generateToken(user._id);

      logger.info('로그인 성공', { userId: user._id });

      res.status(StatusCodes.OK).json({ message: '로그인에 성공하였습니다.', token });
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '로그인에 실패했습니다.' });
    }
  }
);

module.exports = router;
