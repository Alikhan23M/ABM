const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ['custom', 'embed'],
    required: true
  },
  videoUrl: { type: String }, // For custom videos
  embedCode: { type: String }, // For embed videos
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // reference to the Category model

  },
  isArchived: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Optional: Validation so at least one of videoUrl or embedCode is required
VideoSchema.pre('save', function (next) {
  if (this.type === 'custom' && !this.videoUrl) {
    return next(new Error('Custom videos must have a videoUrl'));
  }
  if (this.type === 'embed' && !this.embedCode) {
    return next(new Error('Embed videos must have an embedCode'));
  }
  next();
});

const Video = mongoose.model('Video', VideoSchema);
module.exports = Video;
