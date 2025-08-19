// seedSectionInfo.js
const mongoose = require('mongoose');
const SectionInfo = require('./models/sectionInfoModel'); // Correct path to your model file
const connectDB = require('./configuration/dbConfiguration'); // Assuming you have this file for DB connection

// A hardcoded array of initial section data based on your schema.
// The 'position' field acts as the permanent, unique identifier.
const initialSectionData = [
    {
        title: 'Up Header',
        description: '',
        buttonText: '',
        buttonLink: '',
        position: 'up-header'
    },
    {
        title: 'OUR IMPACT',
        description: '',
        buttonText: '',
        buttonLink: '',
        position: 'our-impact'
    },
    {
        title: '',
        description: '',
        buttonText: '',
        buttonLink: '',
        position: 'body-cards'
    },
    {
        title: 'How You Can Help',
        description: 'There are so many ways you can help us in our mission',
        buttonText: '',
        buttonLink: '',
        position: 'how-you-can-help'
    },
    {
        title: 'OUR EVENTS',
        description: '',
        buttonText: 'See All Events',
        buttonLink: '/events',
        position: 'home-events'
    },
    {
        title: 'GALLERY',
        description: '',
        buttonText: 'View All Gallery',
        buttonLink: '/gallery',
        position: 'home-gallery'
    }
    ,
    {
        title: 'NEWS & PUBLICATIONS',
        description: '',
        buttonText: 'Send all News',
        buttonLink: '/news',
        position: 'home-news-and-publicactions'
    }
    ,
    {
        title: 'Our Partners',
        description: '',
        buttonText: 'View All Partners',
        buttonLink: '/partners',
        position: 'home-our-partners'
    }
    ,
    {
        title: 'OUR NEWSLETTER',
        description: 'Sign up now to receive our newsletter.',
        buttonText: '',
        buttonLink: '',
        position: 'home-news-letter'
    }
    ,
    {
        title: 'About Us',
        description: '',
        buttonText: '',
        buttonLink: '',
        position: 'about-us'
    },
    {
        title: 'Vision and Mission',
        description: '',
        buttonText: '',
        buttonLink: '',
        position: 'vission-and-mission'
    }
    ,
    {
        title: 'Partner Organizations',
        description: 'ABM believes in long-lasting and productive partnerships in the field of biorisk management, one health, and zoonoses.ABM currently collaborates with the following partners',
        buttonText: '',
        buttonLink: '',
        position: 'partner-org'
    }
    ,
    {
        title: 'BRM Team',
        description: '',
        buttonText: '',
        buttonLink: '',
        position: 'brm-team'
    }
    ,
    {
        title: 'Management Team',
        description: '',
        buttonText: '',
        buttonLink: '',
        position: 'management-team'
    }
    ,
    {
        title: 'Projects',
        description: '',
        buttonText: '',
        buttonLink: '',
        position: 'projects'
    }
    ,
    {
        title: 'Events',
        description: '',
        buttonText: '',
        buttonLink: '',
        position: 'events'
    }
    ,
    {
        title: 'All Gallery',
        description: '',
        buttonText: '',
        buttonLink: '',
        position: 'gallery'
    }
    ,
    {
        title: 'All Project Activity Pictures',
        description: '',
        buttonText: '',
        buttonLink: '',
        position: 'project-activity-pictures'
    }
    ,
    {
        title: 'Videos',
        description: '',
        buttonText: '',
        buttonLink: '',
        position: 'videos'
    }
    ,
    {
        title: 'News',
        description: '',
        buttonText: '',
        buttonLink: '',
        position: 'news'
    }
    ,
    {
        title: 'Career Opportunities',
        description: 'Explore exciting career and internship opportunities with us. Whether you\'re a skilled professional looking for a new challenge or a student eager to gain real-world experience, we offer roles that empower you to grow, innovate, and make a meaningful impact. Browse the current openings below and take the first step towards your future with us.',
        buttonText: '',
        buttonLink: '',
        position: 'career'
    }
    ,
    {
        title: 'Tenders',
        description: '',
        buttonText: '',
        buttonLink: '',
        position: 'tenders'
    }
    ,
    {
        title: 'Contact Us',
        description: '',
        buttonText: '',
        buttonLink: '',
        position: 'contact-us'
    }
    ,
    {
        title: 'Blog Archives',
        description: '',
        buttonText: '',
        buttonLink: '',
        position: 'archives'
    }
    ,
    {
        title: 'Director Message',
        description: '',
        buttonText: '',
        buttonLink: '',
        position: 'message-from-executive-director'
    }
];

// Asynchronous function to connect to the database and seed the data
const seedSectionInfo = async () => {
  try {
    await connectDB();

    for (const section of initialSectionData) {
      const exists = await SectionInfo.findOne({ position: section.position });

      if (!exists) {
        await SectionInfo.create(section);
        console.log(`Inserted new section: ${section.position}`);
      } else {
        console.log(`Skipped (already exists): ${section.position}`);
      }
    }

    console.log('Seeding completed.');
    process.exit();
  } catch (error) {
    console.error('Error seeding SectionInfo:', error);
    process.exit(1);
  }
};

seedSectionInfo();