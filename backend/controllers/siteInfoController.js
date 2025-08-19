const SiteInfo = require('../models/siteInfoModel');

// Get site info 
exports.getSiteInfo = async (req, res) => {
    try {
        const siteInfo = await SiteInfo.findOne(); // assuming only one document
        if (!siteInfo) {
            return res.status(404).json({ message: 'Site info not found' });
        }
        res.json(siteInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching site info', error: error.message });
    }
};

// Update SiteInfo (only provided fields)
exports.updateSiteInfo = async (req, res) => {
  try {
    const updateData = {};

    // List of allowed fields to update
    const allowedFields = [
      "logo",
      "facebookURL",
      "twitterURL",
      "instagramURL",
      "linkedinURL",
      "youtubeURL"
    ];

    // Only include fields that are not empty or undefined
    allowedFields.forEach(field => {
      if (req.body[field] && req.body[field].trim() !== "") {
        updateData[field] = req.body[field].trim();
      }
    });

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No valid fields provided for update" });
    }

    // Assuming you have only one SiteInfo document
    const updatedSiteInfo = await SiteInfo.findOneAndUpdate(
      {}, // empty filter to update the first/only record
      { $set: updateData },
      { new: true, upsert: true } // upsert: create if not exists
    );

    res.json({ message: "SiteInfo updated successfully", data: updatedSiteInfo });

  } catch (error) {
    console.error("Error updating SiteInfo:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
