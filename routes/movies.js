const router = require('express').Router();
const { celebrateCreateMovie, celebrateDeleteMovie } = require('../middlewares/celebrate');
const {
  getMoviesInfo,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

router.get('/movies', getMoviesInfo);
router.post('/movies', celebrateCreateMovie, createMovie);
router.delete('/movies/movieId', celebrateDeleteMovie, deleteMovieById);

module.exports = router;
