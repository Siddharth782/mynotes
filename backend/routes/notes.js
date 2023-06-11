const express = require('express')
const router = express.Router();
const fetchUser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

// get all the notes
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
})

// adding notes. login required
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').exists(),
    body('description', 'Enter a description of min 5 length').isLength({ min: 5 }),
], async (req, res) => {

    // checking for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description } = req.body;

        const note = new Notes({
            title, description, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
})


// updating notes. login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {

    try {
        // finding a note with the help of Id
        let note = await Notes.findById(req.params.id)
        // params is used for getting the id which is coming with url.
        if (!note) { return res.status(404).send("Data Not Found") }

        // to check if user is the owner of the id
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Permission Not Granted")
        }

        const { title, description } = req.body;

        // describing new Note
        let newNote = {};

        if (title) { newNote.title = title };
        if (description) { newNote.description = description };

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        // { new : true } will return the modified document rather than the original

        res.json({ note })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }

})


// deleting notes. login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {
        // finding a note with the help of Id
        let note = await Notes.findById(req.params.id)

        if (!note) { return res.status(404).send("Data Not Found") }

        // to check if user is the owner of the id
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Permission Not Granted")
        }
        note = await Notes.findByIdAndDelete(req.params.id)

        res.send("Note has been successfully deleted")
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }

})

module.exports = router