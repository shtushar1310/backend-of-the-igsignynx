const router = require('express').Router();
const Contact = require('../models/Contact');

// Submit contact form
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Create new contact entry
        const newContact = new Contact({
            name,
            email,
            message
        });

        // Save to database
        const savedContact = await newContact.save();
        res.status(201).json({
            success: true,
            message: 'Message sent successfully!',
            data: savedContact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error sending message',
            error: error.message
        });
    }
});

module.exports = router; 