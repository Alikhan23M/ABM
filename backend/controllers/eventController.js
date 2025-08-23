const Event = require('../models/eventModel');

// Create a new event
exports.createEvent = async (req, res) => {
    try {
        const { title, images, description, location, time, category } = req.body;

        if (!images || images.length === 0) {
            return res.status(400).json({ message: 'At least one image is required' });
        }

        const newEvent = new Event({
            title,
            images,        // array of image URLs
            description,
            location,
            time,
            category       // reference to Category _id
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: 'Error creating event', error });
    }
};

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({isArchived:false}).populate('category'); // populate category info
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
};

// Get an event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('category');
        if (!event || event.isArchived) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error });
    }
};

// Update an event by ID
exports.updateEventById = async (req, res) => {
    try {
        const { title, images, description, location, time, category } = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { title, images, description, location, time, category },
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error });
    }
};

// Delete an event by ID
exports.deleteEventById = async (req, res) => {
    try {
        const deletedEvent = await Event.findOneAndUpdate({_id:req.params.id},{isArchived:true});
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error });
    }
};
