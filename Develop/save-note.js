const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const readData = util.promisify(fs.readFile);
const writeData = util.promisify(fs.writeFile);

class DataStore {
    // write data to the file
    writeData(data) {
        return writeData('db/db.json', JSON.stringify(data));
    }
    // read data from the file
    readData() {
        return readData('db/db.json', 'utf8');
    }
    // retrieve notes from the data
    retrieveNotes() {
        return this.readData()
            .then(getNotesData => JSON.parse(getNotesData))
            .then(parsedData => [].concat(parsedData));
    }
    
    // add a new note to the store
    addNoteToStore(addNoteData) {
        const { title, text } = addNoteData;
        // Use UUID package to add unique IDs for the note
        const newNoteData = {
            title,
            text,
            id: uuidv4()
        };

        // Retrieve notes, add the new note, and update the notes
        return this.retrieveNotes()
            .then(getNotesData => [...getNotesData, newNoteData])
            .then(updatedNotesData => this.writeData(updatedNotesData))
            .then(() => newNoteData);
    }
    //Bonus delete..
}

module.exports = new DataStore();