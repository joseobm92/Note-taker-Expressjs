const express = require('express');
const path = require('path');
// const dataBase = require('./db/db.json');
// const fs = require('fs');
const util = require('util');
const api = require('./routes/index.js');
// const uuid = require('./helpers/uuid')
// console.log(dataBase)

// const readFromFile = util.promisify(fs.readFile);

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));


//set up for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api); 

// response to get index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// response to get notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
