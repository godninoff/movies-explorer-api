const router = require('express').Router();
const auth = require('../middlewares/auth');
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const { createUser, login } = require('../controllers/users');
const { celebrateLogin, celebrateCreateUser } = require('../middlewares/celebrate');

router.post('/signup', celebrateCreateUser, createUser);
router.post('/signin', celebrateLogin, login);

router.use(auth);
router.use('/', usersRouter);
router.use('/', moviesRouter);

module.exports = router;
