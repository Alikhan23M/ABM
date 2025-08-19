// server.js
const express = require('express');
const connectDB = require('./configuration/dbConfiguration');
const authRoutes = require('./routes/authRoutes');
const teamRoutes = require('./routes/teamRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const projectRoutes = require('./routes/projectRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const careerRoutes = require('./routes/careerRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const newsRoutes = require('./routes/newsRoutes');
const tenderRoutes = require('./routes/tenderRoutes')
const blogRoutes = require('./routes/blogRoutes')
const carousalRoutes = require('./routes/carousalRoutes');
const eventRoutes = require('./routes/eventRoutes')
const partnerRoutes = require('./routes/partnerRoute');
const ContactUsRoutes = require('./routes/contactUsRoutes');
const videoRoutes = require('./routes/videoRoutes');
const search = require('./routes/searchRoutes');
const siteInfo = require('./routes/siteInfoRoutes');
const footerRoutes = require('./routes/footerRoutes');
const bodyCardRoutes = require('./routes/bodyCardRoutes');
const helpOptionRoutes = require('./routes/helpoptionRoutes');
const categories = require('./routes/categoryRoutes');
const stats = require('./routes/statsRoute');
const directorMessage = require('./routes/directorMessageRoute');
const ColorsRoutes = require('./routes/colorRoutes');
const sectionInfoRoutes = require('./routes/sectionInfoRoutes');
const navbarRoutes = require('./routes/navbarRoutes')
const pagesRoutes = require('./routes/pageRoutes');
const cors = require('cors')
const app = express();
const port = process.env.PORT;

// Connect to MongoDB
connectDB();

// Middleware and routes
app.use(express.json());

const corsOptions = {
    origin: ['*', 'http://localhost:5173','http://localhost:4173','https://abm-demo.vercel.app'], // Allow all origins (*) and a specific frontend URL
    credentials: true, // Allow cookies and authentication headers
};

app.use(cors(corsOptions));



app.use('/api/user', authRoutes);
app.use('/api/member', teamRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/pictures', mediaRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/application', applicationRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/tender', tenderRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/slider-images', carousalRoutes)
app.use('/api/events', eventRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/contactus', ContactUsRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/search', search);
app.use('/api/siteinfo',siteInfo)
app.use('/api/footer', footerRoutes);
app.use('/api/bodyCards', bodyCardRoutes);
app.use('/api/help-options', helpOptionRoutes);
app.use('/api/categories', categories);
app.use('/api/stats', stats);
app.use('/api/director-message',directorMessage);
app.use('/api/colors', ColorsRoutes);
app.use('/api/section-info', sectionInfoRoutes);
app.use('/api/navbar', navbarRoutes);
app.use('/api/pages',pagesRoutes);

app.get('/', async (req, res) => {
    try {
        res.send("Hello from the server!");
    } catch (error) {
        res.status(500).send("An error occurred on the server.");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
