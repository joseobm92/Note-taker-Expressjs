const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);


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

// write new note to db
  const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

  //export functions to be called on other places
  module.exports = { readFromFile, writeToFile, readAndAppend };