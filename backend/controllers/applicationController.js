const Application = require('../models/applicationModels');
const Career = require('../models/careerModel');
const User = require('../models/userModel');

// Apply to a career role
exports.applyToRole = async (req, res) => {
    try {
        const { careerId, resumeUrl } = req.body;
        const userId = req.userId; 
        console.log('User Id: ' + userId);

        // Validate careerId
        const career = await Career.findById(careerId);
        if (!career) {
            return res.status(404).json({ message: 'Career role not found' });
        }

        // Check if the user has already applied to this career role
        const existingApplication = await Application.findOne({ userId, careerId });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied to this role' });
        }

        // Create a new application
        const application = new Application({
            userId: userId,
            careerId: careerId,
            resumeUrl: resumeUrl
        });
        await application.save();

        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ message: 'Error applying to role', error });
    }
};


// Get all applications (admin only)
exports.getAllApplications = async (req, res) => {
    try {
        let applications = await Application.find().populate('userId careerId');

        if (applications.length === 0) {
            return res.status(404).json({ message: 'No applications found' });
        }

        // Delete applications with userId null
        for (const application of applications) {
            if (!application.userId) {
                await Application.findByIdAndDelete(application._id);
            }
        }

        // Fetch applications again after deletion
        applications = await Application.find().populate('userId careerId');

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications', error });
    }
};

// Get applications for a specific career role (admin only)
exports.getApplicationsByCareerId = async (req, res) => {
    try {
        const applications = await Application.find({ careerId: req.params.careerId }).populate('userId careerId');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications for career role', error });
    }
};

// Get applications for a specific user (user only)
exports.getApplicationsByUserId = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user is set after authentication
        const applications = await Application.find({ userId: userId }).populate('careerId');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications for user', error });
    }
};
