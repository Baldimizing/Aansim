const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');

// 회원가입 라우터
router.post(
  '/',
  [
    body('email').isEmail().withMessage('올바른 이메일 주소를 입력하세요.'),
    body('password').isLength({ min: 8 }).withMessage('비밀번호는 최소 8자 이상이어야 합니다.'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // 이메일 중복 확인
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: [{ message: '이미 등록된 이메일입니다.' }] });
      }

      // 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(password, 10);

      // 새로운 사용자 생성
      const newUser = new User({
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(StatusCodes.CREATED).json({ message: '회원가입이 완료되었습니다.' });
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '회원가입에 실패했습니다.' });
    }
  }
);

module.exports = router;
