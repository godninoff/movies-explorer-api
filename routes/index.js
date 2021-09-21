const router = require('express').Router();
const auth = require('../middlewares/auth');
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const { createUser, login } = require('../controllers/users');
const { celebrateLogin, celebrateCreateUser } = require('../middlewares/celebrate');
const systemMessage = require('../errors/errors-const');
const NotFound = require('../errors/NotFound');

router.post('/signup', celebrateCreateUser, createUser);
router.post('/signin', celebrateLogin, login);

router.use(auth);
router.use('/', usersRouter);
router.use('/', moviesRouter);

router.use('*', (req, res, next) => {
  next(new NotFound(systemMessage.ROUTER_NOT_FOUND));
});

module.exports = router;
