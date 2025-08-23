const express = require('express');
const mongoose = require('mongoose');
const TeamMember = require('./../models/teamModel');

// Get all team members
exports.getMembers = async (req, res) => {
    try {
        const members = await TeamMember.find();
        res.json(members);
    } catch (err) {
        res.status(500).send({ message:err.message});
    }
};

exports.getMembersByType = async (req, res) => {
    const { teamType } = req.params;
    try {
        const members = await TeamMember.find({ teamType,isArchived:false},); // Changed findOne to find
        res.json(members);
    } catch (err) {
        res.status(500).send({ message:err.message});
    }
};

// Get a single team member by ID
exports.getMemberById = async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member || member.isArchived) return res.status(404).send('Member not found');
        res.json(member);
    } catch (err) {
        res.status(500).send({ message:err.message});
    }
};

// Add a new team member
exports.addMember = async (req, res) => {
    try {
        const { name, designation,teamType, expertise,imageUrl } = req.body;
        const newMember = new TeamMember({ name, designation,teamType, expertise,imageUrl });
        await newMember.save();
        res.status(201).json(newMember);
    } catch (err) {
        res.status(500).send({ message:err.message});
    }
};

// Update a team member by ID
exports.updateMember = async (req, res) => {
    try {
        const { name, designation, expertise,imageUrl,teamType } = req.body;
        const member = await TeamMember.findByIdAndUpdate(
            req.params.id,
            { name, designation,teamType, expertise,imageUrl,teamType},
            { new: true, runValidators: true }
        );
        if (!member) return res.status(404).send('Member not found');
        res.json(member);
    } catch (err) {
        res.status(500).send({ message:err.message});
    }
};

// Delete a team member by ID
exports.deleteMember = async (req, res) => {
    try {
        const member = await TeamMember.findOneAndUpdate({_id:req.params.id},{isArchived:true});
        if (!member) return res.status(404).send('Member not found');
        res.json(member);
    } catch (err) {
        res.status(500).send({ message:err.message});
    }
};


// ******************************PARTNER ORG************************************************

