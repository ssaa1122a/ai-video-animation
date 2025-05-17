const express = require('express');
const router = express.Router();
const VideoController = require('../controllers/videos');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', auth, VideoController.createVideo);
router.get('/', auth, VideoController.getUserVideos);
router.get('/:id', auth, VideoController.getVideo);
router.put('/:id', auth, VideoController.updateVideo);
router.post('/:id/generate', auth, VideoController.generateVideo);
router.delete('/:id', auth, VideoController.deleteVideo);

module.exports = router;