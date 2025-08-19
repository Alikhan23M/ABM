const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
  // Legal & Certifications Section
  legalSection: {
    title: {
      type: String,
      default: "Legal Standings & Certifications"
    },
    certifications: [{
      name: {
        type: String,
        default: "Pakistan Center For Philanthropy"
      },
      icon: {
        type: String,
        default: "FaCheckCircle"
      },
      color: {
        type: String,
        default: "text-yellow-400"
      }
    }],
    programs: {
      type: String,
      default: "Our Programs are in line with UNSDGs"
    },
    organization: {
      type: String,
      default: "Abm Pakistan"
    },
    taxNumber: {
      type: String,
      default: "National Tax Number: 7547210-8"
    }
  },

  // About Section
  aboutSection: {
    title: {
      type: String,
      default: "About"
    },
    links: [{
      text: {
        type: String,
        default: "Board"
      },
      url: {
        type: String,
        default: "#"
      }
    }]
  },

  // Quick Links Section
  quickLinksSection: {
    title: {
      type: String,
      default: "Quick Links"
    },
    links: [{
      text: {
        type: String,
        default: "What We Do"
      },
      url: {
        type: String,
        default: "#"
      },
      icon: {
        type: String,
        default: "FaRegBuilding"
      }
    }]
  },

  // Contact Section
  contactSection: {
    title: {
      type: String,
      default: "Contact (ABM)"
    },
    email: {
      type: String,
      default: "contact.abm@domain.com"
    },
    phone: {
      type: String,
      default: "+92 300 1234567"
    },
    address: {
      type: String,
      default: "123 ABM Street, Karachi, Pakistan"
    }
  },

  // Bottom Section
  bottomSection: {
    registration: {
      type: String,
      default: "ABM Pakistan Pakistan is registered under the 1860 Societies Registration Act."
    },
    copyright: {
      type: String,
      default: "Copyright © 2025 Abm Pakistan. All rights reserved."
    }
  },

  // Footer Styling
  styling: {
    backgroundColor: {
      type: String,
      default: "bg-teal-900"
    },
    textColor: {
      type: String,
      default: "text-white"
    },
    accentColor: {
      type: String,
      default: "text-yellow-400"
    }
  },

  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Footer', footerSchema);





