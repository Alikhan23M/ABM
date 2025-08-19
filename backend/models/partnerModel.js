const mongoose = require('mongoose');

const partnerOrgSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: false }
});

const PartnerOrg = mongoose.model('PartnerOrg', partnerOrgSchema);

module.exports = PartnerOrg;
