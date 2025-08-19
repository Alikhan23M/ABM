const AboutUs = require('../models/aboutModel');

// **************************ABOUT,MISSION,VISION***************************
exports.updateAboutUs = async (req, res) => {
    const { title, description, category, imgUrl } = req.body;
    try {
        const updateData = { title, description, category };
        if (imgUrl) {
            updateData.imgUrl = imgUrl;
        }

        // Update About Us description in the database by category
        const aboutUs = await AboutUs.findOneAndUpdate(
            { category },
            updateData,
            { upsert: true, new: true }
        );

        res.json({ msg: `${category} description updated successfully`, aboutUs });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get About Us description by category
exports.getAboutUs = async (req, res) => {
    const { category } = req.params;
    try {
        // Retrieve About Us description from the database by category
        const aboutUs = await AboutUs.findOne({ category });

        if (!aboutUs) {
            return res.status(404).json({ msg: `${category} description not found` });
        }

        // Return the About Us description
        res.json({ aboutUs });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};



//***************************ABM TEAM****************************************/


// // Update Team information
// exports.updateTeamMember = async (req, res) => {
//     const memberId = req.params.id;
//     const { title, description, imgUrl } = req.body;
//     try {
//         // Update the team member by ID
//         const updatedTeamMember = await TeamMember.findByIdAndUpdate(memberId, { title, description, imgUrl }, { new: true });

//         if (!updatedTeamMember) {
//             return res.status(404).json({ msg: 'Team member not found' });
//         }

//         res.json({ msg: 'Team member updated successfully', updatedTeamMember });
//     } catch (err) {
//         res.status(500).json({ msg: 'Server error' });
//     }
// };


// // Get Team information
// exports.getTeam = async (req, res) => {
//     try {
//         // Retrieve Team information from the database
//         const teamInfo = await AboutUs.findOne();

//         // Return the Team information
//         res.json({ teamInfo });
//     } catch (err) {
//         res.status(500).json({ msg: 'Server error' });
//     }
// };

// exports.addTeamMember = async (req, res) => {
//     const { title, description, imgUrl } = req.body;
//     try {
//         // Create a new team member
//         const newTeamMember = new AboutUs({ title, description, imgUrl });
//         await newTeamMember.save();

//         res.status(201).json({ msg: 'Team member added successfully' });
//     } catch (err) {
//         res.status(500).json({ msg: 'Server error' });
//     }
// };







