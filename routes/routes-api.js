const router = require('express').Router();
const notesData = require('../save-note')

router.get('/notes', function(req, res) {
    notesData.retrieveNotes()
        .then(getNotesData => res.json(getNotesData))
});

router.post('/notes', function(req, res) {
    notesData.addNoteToStore(req.body)
        .then((addNoteData) => res.json(addNoteData))
});

module.exports = router;