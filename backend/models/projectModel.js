const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    area: { type: String, required: true },
    duration: { type: String, required: true }, 
    description:{type:String,required:true},
    images: [{ type: String,}],
    projectStatus: { 
        type: String, 
        required: true,
        enum: ['Pending', 'Ongoing', 'Completed'] 
    },
    isArchived:{
        type: Boolean,
        default: false
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
