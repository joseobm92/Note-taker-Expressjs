//require express
const express = require('express');

// Import our modular routers for /notes
const notesRouter = require('./notes');

// assigning express to the app variable
const app = express();

app.use('/notes', notesRouter);

//export module to use somewhere else
module.exports = app;