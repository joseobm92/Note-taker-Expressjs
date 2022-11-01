const express = require('express');
const path = require('path');

const util = require('util');
const api = require('./routes/index.js');


const app = express();

// dynamic port to be able to use heroku
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

// listening to port 3001
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
