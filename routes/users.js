const router = require('express').Router();
const { celebrateUpdateUser } = require('../middlewares/celebrate');

const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');

router.get('/users/me', getUserInfo);
router.patch('/users/me', celebrateUpdateUser, updateUser);

module.exports = router;
