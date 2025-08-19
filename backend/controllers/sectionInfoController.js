const sectionInfoModel = require('../models/sectionInfoModel'); // Assuming this is the correct path to your model



exports.getSectionInfo = async (req, res) => {
    try {
        const sectionInfo = await sectionInfoModel.find();
        res.status(200).json(sectionInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching section information', error });
    }
};

exports.getSectionInfoByPosition = async (req, res) => {
    const { position } = req.params;

    try {
        const sectionInfo = await sectionInfoModel.findOne({ position });
        if (!sectionInfo) {
            return res.status(404).json({ message: 'Section not found' });
        }
        res.status(200).json(sectionInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching section information', error });
    }
};

exports.updateSectionInfo = async (req, res) => {
    const { position } = req.params;
    const updateData = req.body;

    try {
        const sectionInfo = await sectionInfoModel.findOneAndUpdate({ position }, updateData, { new: true });
        if (!sectionInfo) {
            return res.status(404).json({ message: 'Section not found' });
        }
        res.status(200).json(sectionInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating section information', error });
    }
};
