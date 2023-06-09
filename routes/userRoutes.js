const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// 회원가입
router.post('/signup', UserController.signup);

// 사용자 조회
router.get('/', UserController.getAllUsers);

// 로그인
router.post('/login', UserController.login);

module.exports = router;