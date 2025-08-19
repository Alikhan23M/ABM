// const mongoose = require('mongoose');

// const navbarSchema = new mongoose.Schema({
//   // Navigation item details
//   text: {
//     type: String,
//     required: true,
//     trim: true
//   },
  
//   url: {
//     type: String,
//     required: true,
//     trim: true
//   },
  
//   // Navigation structure
//   parentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Navbar',
//     default: null
//   },
  
//   // Display properties
//   order: {
//     type: Number,
//     default: 0
//   },
  
//   isVisible: {
//     type: Boolean,
//     default: true
//   },
  
//   // Styling options
//   styling: {
//     textColor: {
//       type: String,
//       default: "text-gray-700"
//     },
//     hoverColor: {
//       type: String,
//       default: "hover:text-teal-600"
//     },
//     activeColor: {
//       type: String,
//       default: "text-teal-600"
//     },
//     fontWeight: {
//       type: String,
//       default: "font-medium",
//       enum: ["font-light", "font-normal", "font-medium", "font-semibold", "font-bold"]
//     }
//   },
  
//   // Additional properties
//   icon: {
//     type: String,
//     default: null
//   },
  
//   target: {
//     type: String,
//     default: "_self",
//     enum: ["_self", "_blank", "_parent", "_top"]
//   },
  
//   // SEO and accessibility
//   title: String,
//   ariaLabel: String,
  
//   // Status
//   isActive: {
//     type: Boolean,
//     default: true
//   }
// }, {
//   timestamps: true
// });

// // Indexes for better performance
// navbarSchema.index({ parentId: 1, order: 1 });
// navbarSchema.index({ isVisible: 1, isActive: 1 });

// module.exports = mongoose.model('Navbar', navbarSchema);

// models/Navbar.js


const mongoose = require("mongoose");

// Schema for dropdown items inside a nav link
const DropdownItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url: { type: String, required: true },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
});

// Schema for nav links (can be direct or dropdown)
const NavbarLinkSchema = new mongoose.Schema({
  label: { type: String, required: true }, // "About Us"
  url: { type: String }, // "/about-us"
  type: {
    type: String,
    enum: ["direct", "dropdown"],
    default: "direct",
  },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
  dropdownItems: [DropdownItemSchema], // only if type = dropdown
});

// Styling schema (for full customization in admin panel)
const NavbarStylingSchema = new mongoose.Schema({
  navbar: {
    backgroundColor: { type: String, default: "#ffffff" },
    textColor: { type: String, default: "#000000" },
  },
  links: {
    color: { type: String, default: "#000000" },
    hoverColor: { type: String, default: "#1d4ed8" },
    activeColor: { type: String, default: "#2563eb" },
    fontWeight: {
      type: String,
      default: "font-medium",
      enum: ["font-light", "font-normal", "font-medium", "font-semibold", "font-bold"],
    },
  },
  dropdown: {
    backgroundColor: { type: String, default: "#ffffff" },
    textColor: { type: String, default: "#000000" },
    hoverBackgroundColor: { type: String, default: "#f3f4f6" },
    hoverTextColor: { type: String, default: "#1d4ed8" },
  },
  input: {
    backgroundColor: { type: String, default: "#ffffff" },
    borderColor: { type: String, default: "#d1d5db" },
    textColor: { type: String, default: "#000000" },
    placeholderColor: { type: String, default: "#9ca3af" },
  },
  button: {
    backgroundColor: { type: String, default: "#2563eb" },
    textColor: { type: String, default: "#ffffff" },
    hoverBackgroundColor: { type: String, default: "#1d4ed8" },
    hoverTextColor: { type: String, default: "#f3f4f6" },
  },
});

// Final Navbar Schema
const NavbarSchema = new mongoose.Schema(
  {
    links: [NavbarLinkSchema], // All nav links
    styling: NavbarStylingSchema, // Colors and styles
    isActive: { type: Boolean, default: true }, // toggle whole navbar
  },
  { timestamps: true }
);

module.exports = mongoose.model("Navbar", NavbarSchema);
