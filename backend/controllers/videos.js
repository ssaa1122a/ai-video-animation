const Video = require('../models/Video');
const { generateVideoWithAI } = require('../services/aiService');

exports.createVideo = async (req, res) => {
  try {
    const { title, description, templateId, elements } = req.body;
    
    const video = new Video({
      userId: req.user.id,
      title,
      description,
      templateId,
      elements
    });

    await video.save();
    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.generateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    // Call AI service to generate video
    const outputUrl = await generateVideoWithAI(video);
    
    video.outputUrl = outputUrl;
    video.status = 'completed';
    await video.save();

    res.json({ outputUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add other controller methods (getVideo, updateVideo, etc.)