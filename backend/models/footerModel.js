const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
  // Legal & Certifications Section
  legalSection: {
    title: {
      title: {
        type: String,
        default: "Legal Standings & Certifications"
      },
      fontSize: { type: Number }
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
        default: "#FFA700"
      },
      fontSize: {
        type: Number,
        default: 1
      }
    }],

    programs: {
      programs: {
        type: String,
        default: "Our Programs are in line with UNSDGs"
      },
      fontSize: { type: Number }
    },

    organization: {
      organization: {
        type: String,
        default: "Abm Pakistan"
      },
      fontSize: { type: Number }
    },

    taxNumber: {
      taxNumber: {
        type: String,
        default: "National Tax Number: 7547210-8"
      },
      fontSize: { type: Number }
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
    }],
    fontSize:{type:Number}
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
    }],
    fontSize:{type:Number}
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
    },
    fontSize:{type:Number}
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
    },
    fontSize:{type:Number}
  },

  // Footer Styling
  styling: {
    backgroundColor: {
      type: String,
      default: "teal"
    },
    textColor: {
      type: String,
      default: "white"
    },
    accentColor: {
      type: String,
      default: "#FFA700"
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





