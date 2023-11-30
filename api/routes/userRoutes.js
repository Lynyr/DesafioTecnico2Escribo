// userRoutes.js

const express = require('express');
const { createUser, loginUser, getUserInfo } = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Rota para registro de usuário
router.post('/register', createUser);

// Rota para login
router.post('/login', loginUser);

// Rota protegida para obter informações do usuário
router.get('/user', authMiddleware, getUserInfo);

module.exports = router;
