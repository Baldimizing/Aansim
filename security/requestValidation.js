const { body, validationResult, check } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

const validateBody = (fields) => {
  return [
    body(fields).exists().withMessage('필수 입력 필드입니다.'),
    check(fields).isEmail().withMessage('올바른 이메일 주소를 입력하세요.'),
    check(fields).notEmpty().withMessage('비밀번호를 입력하세요.'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
      }
      next();
    }
  ]
}

module.exports = { validateBody };
