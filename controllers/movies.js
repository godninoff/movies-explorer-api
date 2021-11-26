const Movie = require('../models/movies');
const systemMessage = require('../errors/errors-const');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');
const NotFound = require('../errors/NotFound');

module.exports.getMoviesInfo = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
  // return res.sendStatus(500)
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(systemMessage.BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findOne(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFound(systemMessage.MOVIE_NOT_FOUND);
      }
      if (movie.owner.toString() !== req.user._id) {
        next(new Forbidden(systemMessage.MOVIE_REMOVE_ERROR));
        return;
      }
      movie.deleteOne()
        .then((deletedMovie) => res.send(deletedMovie))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(systemMessage.MOVIE_NOT_FOUND));
      } else {
        next(err);
      }
    });
};
