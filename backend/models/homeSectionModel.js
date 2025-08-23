const mongoose = require('mongoose');

const homeSectionSchema = new mongoose.Schema({
    sectionName: {
        type: String,
        required: [true, 'A section must have a name'],
        unique: true,
        enum: [
            'OurImpact',
            'BodyCard',
            'HowCanHelp',
            'OurPrograms',
            'Gallery',
            'NewsCards',
            'Partners',
            'Newsletter'
        ]
    },
    order: {
        type: Number,
        required: [true, 'A section must have an order'],
    
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const HomeSection = mongoose.model('HomeSection', homeSectionSchema);

// Pre-populate the database with the sections if they don't exist
const initialSections = [
    { sectionName: 'OurImpact', order: 1, isActive: true },
    { sectionName: 'BodyCard', order: 2, isActive: true },
    { sectionName: 'HowCanHelp', order: 3, isActive: true },
    { sectionName: 'OurPrograms', order: 4, isActive: true },
    { sectionName: 'Gallery', order: 5, isActive: true },
    { sectionName: 'NewsCards', order: 6, isActive: true },
    { sectionName: 'Partners', order: 7, isActive: true },
    { sectionName: 'Newsletter', order: 8, isActive: true }
];

async function populateHomeSections() {
    try {
        const count = await HomeSection.countDocuments({});
        if (count === 0) {
            await HomeSection.insertMany(initialSections);
            console.log('Initial home sections populated successfully.');
        }
    } catch (error) {
        console.error('Error populating home sections:', error);
    }
}

populateHomeSections();

module.exports = HomeSection;