const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
    // The unique position identifier of the section
    position: { 
        type: String, 
        required: true, 
        unique: true 
    },

    // Section Content or Page main content
    content: {
        title: { type: String, default: "Section Title" },
        description: { type: String, default: "Section description..." }
    },

    // Section background and background colors
    background: {
        sectionBgColor: { type: String, default: "#f6f1ee" }, // page main bg
        containerBgColor: { type: String, default: "#ffffff" } // inner container/card bg
    },

    // Main Text
    text: {
        headingColor: { type: String, default: "#0f766e" }, // teal-800
        highlightedTextColor: { type: String, default: "#f59e0b" }, // yellow-700
        paragraphColor: { type: String, default: "#374151" } // gray-700
    },

    // Buttons (supports multiple buttons)
    buttons: [{
        bgColor: { type: String, default: "#f59e0b" },
        textColor: { type: String, default: "#000000" },
        hoverBgColor: { type: String, default: "#fbbf24" },
        hoverTextColor: { type: String, default: "#000000" },
        buttonBorderColor:{type:String,default:"#ffffff"}
    }],

    // Cards
    cards: [{
        bgColor: { type: String, default: "#ffffff" },
        headingColor: { type: String, default: "#0f766e" },
        descriptionColor: { type: String, default: "#374151" },
        borderColor: { type: String, default: "#f59e0b" },
        iconColor: { type: String, default: "#0f766e" },
        specialLineColor: { type: String, default: "#f59e0b" },
        button: {
            bgColor: { type: String, default: "#f59e0b" },
            textColor: { type: String, default: "#000000" },
            hoverBgColor: { type: String, default: "#fbbf24" },
            hoverTextColor: { type: String, default: "#000000" }
        },
        link: {
            textColor: { type: String, default: "#3b82f6" }, // blue-600
            hoverColor: { type: String, default: "#2563eb" } // blue-700
        }
    }],

    // Input fields / forms
    inputFields: [{
        bgColor: { type: String, default: "#ffffff" },
        textColor: { type: String, default: "#000000" },
        borderColor: { type: String, default: "#d1d5db" } // gray-300
    }],

    // Extra: future proofing for sliders, banners, videos, etc.
    extras: mongoose.Schema.Types.Mixed
},
{ timestamps: true });

const Colors = mongoose.model('Colors', ColorSchema);

module.exports = Colors;
