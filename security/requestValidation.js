const { body, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

const validateBody = (fields) => {
  return [
    body(fields).exists().withMessage('필수 입력 필드입니다.'),
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
