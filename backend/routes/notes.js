const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})

router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'enter a valid description').isLength({ min: 10 })
], async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const note = new Notes({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();
        res.json({ "success": "Note Added Successfully", note: savedNote });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(401).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ "Success": "Note Updated Successfully", note: note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(401).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id, { new: true });
        res.json({ "Successs": "Note Deleted Succesfully", note: note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})



module.exports = router;