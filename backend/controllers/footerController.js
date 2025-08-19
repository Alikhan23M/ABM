const Footer = require('../models/footerModel');

// Get footer data (public route)
const getFooter = async (req, res) => {
    try {
        const footer = await Footer.findOne({ isActive: true });
        
        if (!footer) {
            // Return default footer if none exists
            return res.status(200).json({
                legalSection: {
                    title: "Legal Standings & Certifications",
                    certifications: [
                        { name: "Pakistan Center For Philanthropy", icon: "FaCheckCircle", color: "text-yellow-400" },
                        { name: "Pakistan Center For Philanthropy", icon: "FaCheckCircle", color: "text-yellow-400" }
                    ],
                    programs: "Our Programs are in line with UNSDGs",
                    organization: "Abm Pakistan",
                    taxNumber: "National Tax Number: 7547210-8"
                },
                aboutSection: {
                    title: "About",
                    links: [
                        { text: "Board", url: "#" },
                        { text: "Board", url: "#" },
                        { text: "Board", url: "#" },
                        { text: "Board", url: "#" },
                        { text: "Board", url: "#" }
                    ]
                },
                quickLinksSection: {
                    title: "Quick Links",
                    links: [
                        { text: "What We Do", url: "#", icon: "FaRegBuilding" },
                        { text: "Success Stories", url: "#", icon: "FaNewspaper" },
                        { text: "News & Publications", url: "#", icon: "FaUsers" },
                        { text: "Volunteer", url: "#", icon: "FaHandsHelping" },
                        { text: "Careers", url: "#", icon: "FaBriefcase" },
                        { text: "Contact Us", url: "#", icon: "FaUsers" },
                        { text: "Staff Portal", url: "#", icon: "FaUsers" }
                    ]
                },
                contactSection: {
                    title: "Contact (ABM)",
                    email: "contact.abm@domain.com",
                    phone: "+92 300 1234567",
                    address: "123 ABM Street, Karachi, Pakistan"
                },
                bottomSection: {
                    registration: "ABM Pakistan Pakistan is registered under the 1860 Societies Registration Act.",
                    copyright: "Copyright © 2025 Abm Pakistan. All rights reserved."
                },
                styling: {
                    backgroundColor: "bg-teal-900",
                    textColor: "text-white",
                    accentColor: "text-yellow-400"
                }
            });
        }
        
        res.status(200).json(footer);
    } catch (error) {
        console.error('Error fetching footer:', error);
        res.status(500).json({ message: 'Error fetching footer data' });
    }
};

// Get footer data for admin (with all footers)
const getAllFooters = async (req, res) => {
    try {
        const footers = await Footer.find().sort({ createdAt: -1 });
        res.status(200).json(footers);
    } catch (error) {
        console.error('Error fetching all footers:', error);
        res.status(500).json({ message: 'Error fetching footer data' });
    }
};

// Create new footer
const createFooter = async (req, res) => {
    try {
        const footerData = req.body;
        
        // Deactivate all existing footers
        await Footer.updateMany({}, { isActive: false });
        
        // Create new footer as active
        const newFooter = new Footer({
            ...footerData,
            isActive: true
        });
        
        const savedFooter = await newFooter.save();
        res.status(201).json(savedFooter);
    } catch (error) {
        console.error('Error creating footer:', error);
        res.status(500).json({ message: 'Error creating footer' });
    }
};

// Update footer
const updateFooter = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        const updatedFooter = await Footer.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!updatedFooter) {
            return res.status(404).json({ message: 'Footer not found' });
        }
        
        res.status(200).json(updatedFooter);
    } catch (error) {
        console.error('Error updating footer:', error);
        res.status(500).json({ message: 'Error updating footer' });
    }
};

// Delete footer
const deleteFooter = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedFooter = await Footer.findByIdAndDelete(id);
        
        if (!deletedFooter) {
            return res.status(404).json({ message: 'Footer not found' });
        }
        
        // If deleted footer was active, activate the most recent one
        if (deletedFooter.isActive) {
            const latestFooter = await Footer.findOne().sort({ createdAt: -1 });
            if (latestFooter) {
                latestFooter.isActive = true;
                await latestFooter.save();
            }
        }
        
        res.status(200).json({ message: 'Footer deleted successfully' });
    } catch (error) {
        console.error('Error deleting footer:', error);
        res.status(500).json({ message: 'Error deleting footer' });
    }
};

// Set footer as active
const setActiveFooter = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Deactivate all footers
        await Footer.updateMany({}, { isActive: false });
        
        // Activate the selected footer
        const activeFooter = await Footer.findByIdAndUpdate(
            id,
            { isActive: true },
            { new: true }
        );
        
        if (!activeFooter) {
            return res.status(404).json({ message: 'Footer not found' });
        }
        
        res.status(200).json(activeFooter);
    } catch (error) {
        console.error('Error setting active footer:', error);
        res.status(500).json({ message: 'Error setting active footer' });
    }
};

module.exports = {
    getFooter,
    getAllFooters,
    createFooter,
    updateFooter,
    deleteFooter,
    setActiveFooter
};





