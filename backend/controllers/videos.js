exports.generateVideo = (req, res) => {
    const { prompt } = req.body;
    console.log('▶️ Prompt received:', prompt);
    res.status(200).json({ message: 'Video generation started', prompt });
};
