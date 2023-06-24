const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const { body, validationResult } = require('express-validator');
const { generateToken } = require('../security/jwtUtil');
const authenticateToken = require('../security/AuthenticationMiddleware');
const passwordPolicy = require('../security/passwordPolicy');
const requestValidation = require('../security/requestValidation');
const logger = require('../security/logger');
const { login } = require('../controllers/UserController');

// 로그인 라우터
router.post(
  '/',
  [
    body('email').isEmail(),
    body('password').notEmpty(),
    passwordPolicy.validatePassword,
    requestValidation.validateBody,
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: '등록되지 않은 이메일입니다.' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: '비밀번호가 일치하지 않습니다.' });
      }

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
