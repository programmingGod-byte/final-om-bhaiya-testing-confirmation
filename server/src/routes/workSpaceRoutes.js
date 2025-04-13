const express = require('express');
const router = express.Router();
const ProjectSchema = require('../models/Projects')
const ProjectFilesSchema = require("../models/ProjectFiles")

router.get('/create-workspace', async (req, res) => {
    res.send("create workspace")
})
// /api/workspace/
router.post('/create-workspace', async (req, res) => {
    const { email, title, description } = req.body;
    console.log(email, title, description)
    if (!email || !title || !description) {
        return res.json({ success: false, message: 'All fields are required' });
    }

    try {
        const newProject = new ProjectSchema({
            email,
            title,
            description
        });

        const result = await newProject.save();

        const newProjectFilesList = new ProjectFilesSchema({
            projectId: result._id,
            title: title,
            email: email,
            files: []
        })

        await newProjectFilesList.save()

        res.status(200).json({ success: true, project: newProject });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to create project' });
    }
});


router.get('/workspace-list', async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
        const projects = await ProjectSchema.find({ email }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, projects });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});



router.get('/files-list', async (req, res) => {
    const { id } = req.query;
    console.log(id)

    if (!id) {
        return res.status(400).json({ success: false, message: 'project id is required' });
    }

    try {
        const projects = await ProjectFilesSchema.findOne({ projectId: id });
        console.log(projects)
        res.status(200).json({ success: true, projects });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
})


router.get('/create-file', async (req, res) => {
    const { id, fileName } = req.query;
    console.log(id)

    if (!id) {
        return res.status(400).json({ success: false, message: 'project id is required' });
    }

    try {

        const project = await ProjectFilesSchema.findOne({projectId:id});
        let updatedFiles = [...project.files,{
            fileName:fileName,
            content:""
        }]

        const updatedProject = await ProjectFilesSchema.findOneAndUpdate(
            { projectId: id },        // Search by field
            {files:updatedFiles},
            { new: true }                         // Return updated doc
        );



        
        res.status(200).json({ success: true, updatedProject });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
})






router.post('/save-all-files', async (req, res) => {
    const { id, files } = req.body;
    

    try {
        const updatedProject = await ProjectFilesSchema.findOneAndUpdate(
            { projectId: id },        // Search by field
            {files:files},
            { new: true }                         // Return updated doc
        );
        res.status(200).json({ success: true, project: updatedProject });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to create project' });
    }
});





module.exports = router;
