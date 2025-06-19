require('dotenv').config();
const pool = require('../config/db');
const axios = require('axios');

exports.askLegal = async (req, res) => {
  try {
    const { question, sessionId: incomingSessionId } = req.body;
    const userId = req.userId;
    const sessionId = incomingSessionId || Date.now().toString();

    const aiRes = await axios.post(`${process.env.AI_SERVICE_URL}/ask`, {
      query: question,
      session_id: sessionId,
    });
    const answer = aiRes.data.answer;

    // 1. Ensure session exists
    const [sessions] = await pool.execute(
      'SELECT * FROM chat_sessions WHERE session_id = ? AND user_id = ?',
      [sessionId, userId]
    );
    if (sessions.length === 0) {
      const title = question.split(' ').slice(0, 30).join(' ');
      await pool.execute(
        'INSERT INTO chat_sessions (user_id, session_id, title) VALUES (?, ?, ?)',
        [userId, sessionId, title]
      );
    }

    // 2. Always insert the message pair
    await pool.execute(
      'INSERT INTO chat_messages (session_id, message, response) VALUES (?, ?, ?)',
      [sessionId, question, answer]
    );

    res.json({ answer, sessionId });
  } catch (e) {
    console.error('askLegal error:', e);
    res.status(500).json({ error: e.message });
  }
};

exports.getChatBySession = async (req, res) => {
  const userId = req.userId;
  const { sessionId } = req.params;

  const [rows] = await pool.execute(
    `SELECT m.message, m.response, m.created_at 
     FROM chat_sessions s
     JOIN chat_messages m ON m.session_id = s.session_id
     WHERE s.user_id = ? AND s.session_id = ?
     ORDER BY m.created_at`,
    [userId, sessionId]
  );

  // Transform into interleaved message format
  const messages = [];
  rows.forEach(r => {
    messages.push({ message: r.message, isUser: true });
    messages.push({ message: r.response, isUser: false });
  });

  res.json(messages); // ✅ ready to use in Chat.jsx
};


exports.getSessions = async (req, res) => {
  const userId = req.userId;
  const [rows] = await pool.execute(
    'SELECT session_id, title, created_at FROM chat_sessions WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
  res.json(rows);
};
