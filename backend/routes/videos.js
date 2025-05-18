const express = require('express');
const router = express.Router();
const { generateVideo } = require('../controllers/videos');

router.post('/videos', generateVideo); // ✅ matches POST /api/videos

module.exports = router;
