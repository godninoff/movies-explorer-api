const router = require('express').Router();

const {
  getMoviesInfo,
  createMovie,
  deleteMovieById,
} = require('../controllers/users');

router.get('/movies',   getMoviesInfo);
router.post('/movies', createMovie);
router.delete('/movies/movieId', deleteMovieById);

module.exports = router;