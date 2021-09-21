const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const systemMessage = require('../errors/errors-const');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');
const Unauthorized = require('../errors/Unauthorized');
const { JWT_SECRET } = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  User.findOne({ email })
    .then((data) => {
      if (data) {
        throw new Conflict(systemMessage.DOUBLE_EMAIL);
      }
      return bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({
            name,
            email,
            password: hash,
          })
            .then((user) => res.send({ data: user }))
            .catch((err) => {
              if (err.name === 'ValidationError') {
                next(new BadRequest(systemMessage.BAD_REQUEST));
              } else {
                next(err);
              }
            });
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        })
        .send({ token });
    })
    .catch(() => {
      throw new Unauthorized(systemMessage.CREDENTIAL_ERROR);
    })
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound(systemMessage.NOT_FOUND);
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(systemMessage.NOT_FOUND));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound(systemMessage.NOT_FOUND);
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequest(systemMessage.NOT_FOUND);
      } else if (err.name === 'ValidationError') {
        throw new BadRequest(systemMessage.BAD_REQUEST);
      } else {
        next(err);
      }
    });
};
