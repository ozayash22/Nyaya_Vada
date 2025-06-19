const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authMiddleware');
const chatController = require('../controllers/chatController');

router.post('/ask-legal', authenticate, chatController.askLegal);
router.get('/chat/:sessionId', authenticate, chatController.getChatBySession);
router.get('/sessions', authenticate, chatController.getSessions);

module.exports = router;
