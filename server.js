const express = require('express');
const path = require('path');
const dataBase = require('./db/db.json')

const uuid = require('./helpers/uuid')
// console.log(dataBase)

const app = express();

const PORT = 3001;

app.use(express.static('public'));

//set up for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// response to get index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// response to get notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// get all notes
app.get('/api/notes', (req, res) => res.json(dataBase));

//
app.post('/api/notes', (req, res) => {

  console.info(`${req.method} request received to add a note`);

  const {title, text} = req.body;
  
  if(title && text) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    const noteString = JSON.stringify(newNote);

    fs.writeFile(`./db/${newNote.title}.json`, noteString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Review for ${newNote.title} has been written to JSON file`
          )
    );

    const response = {
      status: 'Note created succesfully',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('error in posting note')
  }
});






app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
