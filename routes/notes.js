const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const dataBase = require('../db/db.json'); 

notes.get('/', (req, res) => {
    console.info(`${req.method} request received for new Note`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


notes.post('/', (req, res) => {

    console.info(`${req.method} request received to add a note`);
    console.log(`${req}`)

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };
        console.log(newNote)
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding Note');
    }

}); 

// notes.get('/:note_id', (req, res) => {
//     if (req.params.note_id) {
//       console.info(`${req.method} request received to get a single a Note`);
//       const notesId = req.params.note_id;
//       for (let i = 0; i < dataBase.length; i++) {
//         const currentNote = dataBase[i];
//         if (currentNote.note_id === notesId) {
//           res.send(dataBase);
//           return;
//         }
//       }
//       res.status(404).send('Review not found');
//     } else {
//       res.status(400).send('Review ID not provided');
//     }
//   });
  
//   notes.delete('/:note_id', (req, res) => {
//     console.log(req.body);
//     console.log(req.params.note_id);
//     if (req.body && req.params.note_id) {
//       console.info(`${req.method} request received to delete a note`);
//       const noteId = req.params.note_id;
//       console.log(noteId)
//       for (let i = 0; i < dataBase.length; i++) {
//         const currentNote = dataBase[i];
//         if (currentNote.note_id === noteId) {
//           res.send(currentNote);
//           console.log(currentNote)
//           return;
//         }
//       }
//       res.status(404).json('Review ID not found');
//     }
//   }); 

module.exports = notes;