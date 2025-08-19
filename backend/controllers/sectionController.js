const Section = require('../models/sectionModel');

// Get all sections
const getAllSections = async (req, res) => {
  try {
    const sections = await Section.find({ isActive: true }).sort({ pageName: 1 });
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sections', error: error.message });
  }
};

// Get section by page name
const getSectionByPage = async (req, res) => {
  try {
    const { pageName } = req.params;
    const section = await Section.findOne({ pageName, isActive: true });
    
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching section', error: error.message });
  }
};

// Get section by ID
const getSectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await Section.findById(id);
    
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching section', error: error.message });
  }
};

// Create new section
const createSection = async (req, res) => {
  try {
    const sectionData = req.body;
    
    // Check if section already exists for this page
    const existingSection = await Section.findOne({ pageName: sectionData.pageName });
    if (existingSection) {
      return res.status(400).json({ message: 'Section for this page already exists' });
    }
    
    const newSection = new Section(sectionData);
    const savedSection = await newSection.save();
    
    res.status(201).json({
      message: 'Section created successfully',
      section: savedSection
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating section', error: error.message });
  }
};

// Update section
const updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedSection = await Section.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedSection) {
      return res.status(404).json({ message: 'Section not found' });
    }
    
    res.status(200).json({
      message: 'Section updated successfully',
      section: updatedSection
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating section', error: error.message });
  }
};

// Delete section
const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedSection = await Section.findByIdAndDelete(id);
    
    if (!deletedSection) {
      return res.status(404).json({ message: 'Section not found' });
    }
    
    res.status(200).json({
      message: 'Section deleted successfully',
      section: deletedSection
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting section', error: error.message });
  }
};

// Toggle section visibility
const toggleSectionVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    
    const section = await Section.findById(id);
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    
    section.isActive = !section.isActive;
    const updatedSection = await section.save();
    
    res.status(200).json({
      message: `Section ${updatedSection.isActive ? 'activated' : 'deactivated'} successfully`,
      section: updatedSection
    });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling section visibility', error: error.message });
  }
};

// Bulk update sections
const bulkUpdateSections = async (req, res) => {
  try {
    const { sections } = req.body;
    
    if (!Array.isArray(sections)) {
      return res.status(400).json({ message: 'Sections must be an array' });
    }
    
    const updatePromises = sections.map(async (sectionData) => {
      const { _id, ...updateData } = sectionData;
      return Section.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });
    });
    
    const updatedSections = await Promise.all(updatePromises);
    
    res.status(200).json({
      message: 'Sections updated successfully',
      sections: updatedSections
    });
  } catch (error) {
    res.status(500).json({ message: 'Error bulk updating sections', error: error.message });
  }
};

// Get sections for specific pages
const getSectionsByPages = async (req, res) => {
  try {
    const { pageNames } = req.query;
    
    if (!pageNames) {
      return res.status(400).json({ message: 'Page names are required' });
    }
    
    const pages = pageNames.split(',');
    const sections = await Section.find({
      pageName: { $in: pages },
      isActive: true
    });
    
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sections', error: error.message });
  }
};

module.exports = {
  getAllSections,
  getSectionByPage,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
  toggleSectionVisibility,
  bulkUpdateSections,
  getSectionsByPages
};
