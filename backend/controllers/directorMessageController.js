const Message = require('../models/directorMessageModel');

// Get the single Contact Us record
exports.getMessage = async (req, res) => {
  try {
    const message = await Message.findOne();
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching director Message', error });
  }
};

// Update the Contact Us record (only accessible to admins)
exports.updateMessage = async (req, res) => {
  const {title, description, imgUrl } = req.body;

  try {
    const message = await Message.findOne();
    if (!message) {
      // Create a new record if it doesn't exist (optional based on your requirements)
      const newMessage = new Message({
        title,
        description,
        imgUrl,
      });
      await newMessage.save();
      return res.status(201).json(newMessage);
    }

    // Update existing contact information
    message.title = title;
    message.description = description;
    message.imgUrl = imgUrl;
    await message.save();
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update Director Message', error });
  }
};
