const About=require('./../models/aboutModel');
const Application=require('./../models/applicationModels');
const Blog=require('./../models/blogModel');
const Career=require('./../models/careerModel');
const Carousal=require('./../models/carousalModel');
const ContactUs=require('./../models/contactUsModel');
const Event=require('./../models/eventModel');
const Media=require('./../models/mediaModel');
const News=require('./../models/newsModel');
const Partner=require('./../models/partnerModel');
const Project=require('./../models/projectModel');
const Team=require('./../models/teamModel');
const Tender=require('./../models/TenderModel');
const User=require('./../models/userModel');
const Video=require('./../models/videoModel');


exports.search= async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).send('Query parameter is required');
    }

    try {
        // Create a regex for case-insensitive search
        const regex = new RegExp(query, 'i');

        // Search in all collections
        const results = await Promise.all([
            About.find({ title: regex }),
            Application.find({ title: regex }),
            Blog.find({ title: regex }),
            Career.find({ title: regex }),
            Carousal.find({ title: regex }),
            ContactUs.find({ message: regex }),
            Event.find({ title: regex }),
            Media.find({ title: regex }),
            News.find({ title: regex }),
            Partner.find({ name: regex }),
            Project.find({ title: regex }),
            Team.find({ name: regex }),
            Tender.find({ title: regex }),
            Video.find({ title: regex })
        ]);

        res.json({
            about: results[0],
            application: results[1],
            blog: results[2],
            career: results[3],
            carousal: results[4],
            contactUs: results[5],
            event: results[6],
            media: results[7],
            news: results[8],
            partner: results[9],
            project: results[10],
            team: results[11],
            tender: results[12],
            video: results[13]
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
