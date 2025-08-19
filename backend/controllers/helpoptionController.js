const HelpOption = require('../models/helpOptionModel');

// GET all help options
exports.getHelpOptions = async (req, res) => {
  try {
    const helpOptions = await HelpOption.find();
    res.status(200).json(helpOptions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching help options", error });
  }
};

// CREATE a help option
exports.createHelpOption = async (req, res) => {
  try {
    const { title, description, buttonText, buttonLink, icon } = req.body;
    const newOption = new HelpOption({ title, description, buttonText, buttonLink, icon });
    await newOption.save();
    res.status(201).json(newOption);
  } catch (error) {
    res.status(400).json({ message: "Error creating help option", error });
  }
};

// UPDATE a help option
exports.updateHelpOption = async (req, res) => {
  try {
    const { title, description, buttonText, buttonLink, icon } = req.body;
    const updatedOption = await HelpOption.findByIdAndUpdate(
      req.params.id,
      { title, description, buttonText, buttonLink, icon },
      { new: true }
    );

    if (!updatedOption) {
      return res.status(404).json({ message: "Help option not found" });
    }

    res.status(200).json(updatedOption);
  } catch (error) {
    res.status(400).json({ message: "Error updating help option", error });
  }
};

// DELETE a help option
exports.deleteHelpOption = async (req, res) => {
  try {
    const deletedOption = await HelpOption.findByIdAndDelete(req.params.id);
    if (!deletedOption) {
      return res.status(404).json({ message: "Help option not found" });
    }
    res.status(200).json({ message: "Help option deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting help option", error });
  }
};
