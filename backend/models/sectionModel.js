const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  // Section identification
  pageName: {
    type: String,
    required: true,
    unique: true,
    enum: [
      'home', 'about-us', 'vision-mission', 'partner-org', 'management-team', 
      'brm-team', 'projects', 'gallery', 'news', 'career', 'tenders', 
      'contact-us', 'blogs', 'events', 'archives'
    ]
  },
  
  // Section content
  title: {
    type: String,
    required: true,
    default: "Default Title"
  },
  
  description: {
    type: String,
    required: true,
    default: "Default description for this section"
  },
  
  // Color management
  colors: {
    // Background colors
    backgroundColor: {
      type: String,
      default: "bg-white"
    },
    cardBackgroundColor: {
      type: String,
      default: "bg-gray-50"
    },
    
    // Text colors
    titleColor: {
      type: String,
      default: "text-gray-900"
    },
    descriptionColor: {
      type: String,
      default: "text-gray-600"
    },
    cardTextColor: {
      type: String,
      default: "text-gray-800"
    },
    
    // Button colors
    buttonBackgroundColor: {
      type: String,
      default: "bg-teal-600"
    },
    buttonTextColor: {
      type: String,
      default: "text-white"
    },
    buttonHoverColor: {
      type: String,
      default: "hover:bg-teal-700"
    },
    
    // Accent colors
    accentColor: {
      type: String,
      default: "text-teal-600"
    },
    borderColor: {
      type: String,
      default: "border-teal-200"
    }
  },
  
  // Section visibility and status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Additional styling options
  styling: {
    titleSize: {
      type: String,
      default: "text-3xl",
      enum: ["text-xl", "text-2xl", "text-3xl", "text-4xl", "text-5xl"]
    },
    descriptionSize: {
      type: String,
      default: "text-lg",
      enum: ["text-sm", "text-base", "text-lg", "text-xl"]
    },
    cardShadow: {
      type: String,
      default: "shadow-md",
      enum: ["shadow-sm", "shadow", "shadow-md", "shadow-lg", "shadow-xl"]
    },
    borderRadius: {
      type: String,
      default: "rounded-lg",
      enum: ["rounded", "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl"]
    }
  },
  
  // Metadata
  meta: {
    keywords: [String],
    seoDescription: String
  }
}, {
  timestamps: true
});

// Index for faster queries
sectionSchema.index({ pageName: 1, isActive: 1 });

module.exports = mongoose.model('Section', sectionSchema);
