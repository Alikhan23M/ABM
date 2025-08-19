const mongoose = require('mongoose');

const siteInfoSchema = new mongoose.Schema({
   "logo": { type: String,default:'https://example.com/logo.png' },
   "facebookURL": { type: String,default:'https://facebook.com' } ,
   "twitterURL": { type: String,default:'https://twitter.com' },
   "instagramURL": { type: String,default:'https://instagram.com' },
   "linkedinURL": { type: String,default:'https://linkedin.com' },
   "youtubeURL": { type: String,default:'https://youtube.com' },
}, {
    timestamps: true
});

module.exports = mongoose.model('SiteInfo', siteInfoSchema);





