const ContactUs = require('../models/contactUsModel');

// Get the single Contact Us record
exports.getContactUs = async (req, res) => {
  try {
    const contactUs = await ContactUs.findOne();
    res.status(200).json(contactUs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact information', error });
  }
};

// Update the Contact Us record (only accessible to admins)
exports.updateContactUs = async (req, res) => {
  const { address, subAddress, email, phone } = req.body;

  try {
    const contactUs = await ContactUs.findOne();
    if (!contactUs) {
      // Create a new record if it doesn't exist (optional based on your requirements)
      const newContactUs = new ContactUs({
        address,
        subAddress,
        email,
        phone,
      });
      await newContactUs.save();
      return res.status(201).json(newContactUs);
    }

    // Update existing contact information
    contactUs.address = address;
    contactUs.email = email;
    contactUs.phone = phone;
    contactUs.subAddress = subAddress; // Update subAddress if provided
    await contactUs.save();
    res.status(200).json(contactUs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update contact information', error });
  }
};
