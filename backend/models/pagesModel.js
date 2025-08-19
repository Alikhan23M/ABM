// models/pagesModel.js
const mongoose = require('mongoose');

// Schema for a single card within a 'card-grid-page' template.
const cardSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    buttonText: String,
    buttonLink: String,
    order: { type: Number, default: 0 }
}, { _id: false });

// Schema for styling and color options
const colorsSchema = new mongoose.Schema({
    background: {
        pageBgColor: { type: String, default: "#f5f6f5" },
        contentBgColor: { type: String, default: "#ffffff" }
    },
    text: {
        headingColor: { type: String, default: "#0f766e" },
        paragraphColor: { type: String, default: "#374151" }
    },
    button: {
        bgColor: { type: String, default: "#f59e0b" },
        textColor: { type: String, default: "#000000" },
        hoverBgColor: { type: String, default: "#fbbf24" }
    },
    card: {
        bgColor: { type: String, default: "#ffffff" },
        borderColor: { type: String, default: "#e5e7eb" },
        headingColor: { type: String, default: "#0f766e" },
        descriptionColor: { type: String, default: "#374151" }
    }
}, { _id: false });

// Main page schema
const pageSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true },
    
    template: {
        type: String,
        enum: ['simple-page', 'simple-page-with-image', 'card-grid-page'],
        required: true,
        default: 'simple-page'
    },
    
    mainTitle: String,
    mainDescription: String,
    buttonText: String,
    buttonLink: String,

    // Specific field for 'simple-page' content alignment
    contentPosition: { 
        type: String, 
        enum: ['center', 'left'], 
        default: 'center'
    },

    mainImage: String,
    imagePlacement: { 
        type: String, 
        enum: ['top', 'left', 'right'], 
        default: 'top'
    },
    
    cards: [cardSchema],

    // Embedded color theme for the page
    colors: { type: colorsSchema, default: () => ({}) },

    // SEO fields
    seo: {
        title: String,
        description: String,
        keywords: [String]
    },
    
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

pageSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Page = mongoose.model('Page', pageSchema);
module.exports = Page;