require('dotenv').config();
const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');
const systemMessage = require('../errors/errors-const');
const { JWT_SECRET } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Unauthorized(systemMessage.AUTHORIZATION_REQUIRED);
  }

  req.user = payload;

  next();
};
