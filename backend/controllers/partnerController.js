const express = require('express');
const mongoose = require('mongoose');
const TeamMember = require('./../models/partnerModel');
const PartnerOrg=require('./../models/partnerModel');

exports.getPartners= async (req, res) => {
    try {
        const orgs = await PartnerOrg.find({isArchived:false});
        res.json(orgs);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get a single partner organization by ID
exports.getPartnersById= async (req, res) => {
    try {
        const org = await PartnerOrg.findById(req.params.id);
        if (!org || org.isArchived) return res.status(404).send('Organization not found');
        res.json(org);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Add a new partner organization
exports.addPartner = async (req, res) => {
    try {
        const { name, imageUrl, description ,siteUrl} = req.body;
        const newOrg = new PartnerOrg({ name, imageUrl, description, siteUrl });
        await newOrg.save();
        res.status(201).json(newOrg);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Update a partner organization by ID
exports.updatePartner =  async (req, res) => {
    try {
        const { name, imageUrl, description, siteUrl } = req.body;
        const org = await PartnerOrg.findByIdAndUpdate(
            req.params.id,
            { name, imageUrl, description, siteUrl },
            { new: true, runValidators: true }
        );
        if (!org) return res.status(404).send('Organization not found');
        res.json(org);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Delete a partner organization by ID
exports.deletePartner = async (req, res) => {
    try {
        const org = await PartnerOrg.findOneAndUpdate({_id:req.params.id},{isArchived:true});
        if (!org) return res.status(404).send('Organization not found');
        res.json(org);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
