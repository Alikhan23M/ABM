const Video = require('../models/videoModel');

// Get all videos
exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get a single video by ID
exports.getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).send('Video not found');
        res.json(video);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Add a new video
exports.addNewVideo = async (req, res) => {
    try {
        const { title, type, videoUrl, embedCode } = req.body;

        // Validate type
        // if (!['upload', 'embed'].includes(type)) {
        //     return res.status(400).json({ message: 'Invalid video type' });
        // }

        // Validate fields based on type
        if (type === 'upload' && !videoUrl) {
            return res.status(400).json({ message: 'videoUrl is required for upload type' });
        }
        if (type === 'embed' && !embedCode) {
            return res.status(400).json({ message: 'embedCode is required for embed type' });
        }

        const newVideo = new Video({ title, type, videoUrl, embedCode });
        await newVideo.save();

        res.status(201).json(newVideo);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Update a video by ID
exports.updateVideoById = async (req, res) => {
    try {
        const { title, type, videoUrl, embedCode } = req.body;

        // Validate type
        if (type && !['upload', 'embed'].includes(type)) {
            return res.status(400).json({ message: 'Invalid video type' });
        }

        // Validate required fields based on type
        if (type === 'upload' && !videoUrl) {
            return res.status(400).json({ message: 'videoUrl is required for upload type' });
        }
        if (type === 'embed' && !embedCode) {
            return res.status(400).json({ message: 'embedCode is required for embed type' });
        }

        const video = await Video.findByIdAndUpdate(
            req.params.id,
            { title, type, videoUrl, embedCode },
            { new: true, runValidators: true }
        );

        if (!video) return res.status(404).send('Video not found');
        res.json(video);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Delete a video by ID
exports.deleteVideoById = async (req, res) => {
    try {
        const video = await Video.findByIdAndDelete(req.params.id);
        if (!video) return res.status(404).send('Video not found');
        res.json(video);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
