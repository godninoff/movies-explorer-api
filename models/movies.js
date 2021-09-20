const mongoose = require('mongoose');
const { isURL } = require('validator');

const moviesSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v, {
        protocols: ['http', 'https', 'ftp'],
        require_tld: true,
        require_protocol: true,
      }),
      message: 'Введите URL-адрес',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v, {
        protocols: ['http', 'https', 'ftp'],
        require_tld: true,
        require_protocol: true,
      }),
      message: 'Введите URL-адрес',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v, {
        protocols: ['http', 'https', 'ftp'],
        require_tld: true,
        require_protocol: true,
      }),
      message: 'Введите URL-адрес',
    },
  },
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', moviesSchema);
