const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// 회원가입
router.post('/signup', UserController.signup);

// 사용자 조회
router.get('/', UserController.getAllUsers);

module.exports = router;