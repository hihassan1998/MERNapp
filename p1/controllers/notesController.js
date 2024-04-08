const Note = require('../models/Note')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc Get all notes
// @route GET  /notes
// @access Private

const getAllNotes = asyncHandler(async (req, res) => {
    //Get all notes from MongoDB
    const notes = await Note.find().lean()

    // if no notes
    if (!notes?.length) {
        return res.status(400).json({ message: 'No notes found' })
    }

    // Adding username to each note before sending response
    const notesWithUser = await Promise.all(notes.map(async (note) => {
        const user = await User.findById(note.user).lean().exec()
        return { ...note, username: user.username }
    }))
    res.json(notesWithUser)
})




// @desc Create new note
// @route POST  /notes
// @access Private

const createNewNote = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body

    //Confirming the data

    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    //Check for duplicate title

    const duplicate = await Note.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(400).json({ message: 'Duplicate note title' })
    }

    // Create and store the new user
    const note = await Note.create({ user, title, text })

    if (note) { // Created
        return res.status(201).json({ message: 'New note created' })
    } else {
        return res.status(400).json({ message: 'Invalid note data recieved' })
    }

})


// @desc Update a note
// @route PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body

    //Confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm note exists to update
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

    // Check for duplicate title
    const duplicate = await Note.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // allow remaining of the originam note
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }
    note.user = user
    note.title = title
    note.text = text
    note.completed = completed

    const updatedNote = await note.save()

    res.json(`${updatedNote.title} updated`)
})



// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Note ID required' })
    }
    // confirm note exists to delete
    const note = await note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

    const result = await Note.findByIdAndDelete(id) // note.deleteOne

    const reply = `notename ${result.title} with ID ${result._id} deleted`

    res.json(reply)

})


module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}