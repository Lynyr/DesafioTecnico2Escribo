const express = require('express');
const { createUser, loginUser, getUserInfo } = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/user', authMiddleware, getUserInfo);

module.exports = router;
