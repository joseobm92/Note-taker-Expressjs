const express = require('express');
const path = require('path');
const dataBase = require('./db/db.json');
const fs = require('fs');
const util = require('util');

const uuid = require('./helpers/uuid')
// console.log(dataBase)

const readFromFile = util.promisify(fs.readFile);

const app = express();

const PORT = 3001;

app.use(express.static('public'));

//set up for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// response to get index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// response to get notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  console.info(`${req.method} request received for new Note`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//
app.post('/api/notes', (req, res) => {

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

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
      console.log(file)
      console.log(parsedData)
    }
  });
};

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// app.get('/api/notes/:note_id', (req, res) => {
//   console.info(`${req.method} request received to get upvotes for a review`);
//   for (let i = 0; i < dataBase.length; i++) {
//     const currentNote = dataBase[i];
//     if (currentNote.note_id === req.params.note_id) {
//       res.status(200).json({
//         message: `The review with ID ${currentNote.note_id} has ${currentNote.title} and ${currentNote.text}`,
//         upvotes: currentNote.upvotes,
//       });
//       return;
//     }
//   }
//   res.status(404).json('Review ID not found');
// });

app.get('/api/notes/:note_id', (req, res) => {
  if (req.params.note_id) {
    console.info(`${req.method} request received to get a single a review`);
    const notesId = req.params.note_id;
    for (let i = 0; i < dataBase.length; i++) {
      const currentNote = dataBase[i];
      if (currentNote.note_id === notesId) {
        res.send(currentNote);
        return;
      }
    }
    res.status(404).send('Review not found');
  } else {
    res.status(400).send('Review ID not provided');
  }
});

app.post('/api/notes/:note_id', (req, res) => {
  if (req.body && req.params.note_id) {
    console.info(`${req.method} request received to upvote a review`);
    const noteId = req.params.note_id;
    for (let i = 0; i < dataBase.length; i++) {
      const currentNote = dataBase[i];
      if (currentNote.note_id === noteId) {
        res.send(currentNote);
        return;
      }
    }
    res.status(404).json('Review ID not found');
  }
});


// get all notes
// app.get('/api/notes', (req, res) => res.json(dataBase));

// //
// app.post('/api/notes', (req, res) => {

//   console.info(`${req.method} request received to add a note`);

//   const { title, text } = req.body;

//   if (title && text) {
//     const newNote = {
//       title,
//       text,
//       note_id: uuid(),
//     };

//     fs.readFile('./db/db.json', 'utf8', (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         const parsedNotes = JSON.parse(data);

//         parsedNotes.push(newNote);

//         fs.writeFile(
//           './db/db.json',
//           JSON.stringify(parsedNotes, null, 4),
//           (writeErr) =>
//             writeErr
//               ? console.error(writeErr)
//               : console.info('Successfully updated reviews!')
//         );
//       }
//     });

//     const response = {
//       status: 'success',
//       body: newNote,
//     };

//     console.log(response);
//     res.status(201).json(response);
//   } else {
//     res.status(500).json('Error in posting review');
//   }


//   });






app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
