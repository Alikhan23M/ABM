const Project = require('../models/projectModel');

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get a single project by ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).send('Project not found');
        res.json(project);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Add a new project
exports.addNewProject = async (req, res) => {
    try {
        const { title, area, duration, projectStatus, images, description } = req.body;
        const newProject = new Project({ title, area, duration, projectStatus, images, description });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Update a project by ID
exports.updateProjectById = async (req, res) => {
    try {
        const { title, area, duration, projectStatus, images,description } = req.body;
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { title, area, duration, projectStatus, images, description },
            { new: true, runValidators: true }
        );
        if (!project) return res.status(404).send('Project not found');
        res.json(project);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Delete a project by ID
exports.deleteProjectById = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).send('Project not found');
        res.json(project);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
