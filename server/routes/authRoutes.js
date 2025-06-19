const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middlewares/authMiddleware');

// Register and Login
router.post('/register', authController.register);
router.post('/login', authController.login);

// Optional: Endpoint to verify token on refresh
router.get('/me', authenticate, authController.me);  // ✅ authenticated user check

module.exports = router;
