const Movie = require('../models/movies');
const systemMessage = require('../errors/errors-const');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');
const NotFound = require('../errors/NotFound');

module.exports.getMoviesInfo = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
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
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(systemMessage.BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId).select('+owner')
    .then((movie) => {
      if (!movie) {
        throw new NotFound(systemMessage.MOVIE_NOT_FOUND);
      } else
      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new Forbidden(systemMessage.MOVIE_REMOVE_ERROR);
      }
      Movie.findByIdAndDelete(req.params.movieId).select('-owner')
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
