const router = require('express').Router();

const {
  getUserInfo,
  updateUsers,
} = require('../controllers/users');

router.get('/users/me', getUserInfo);
router.patch('/users/me', updateUsers);

module.exports = router;