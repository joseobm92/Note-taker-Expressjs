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

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

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
      console.log(parsedData)
    }
  });
};

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );


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
