const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('./public/assets/uuid')
const PORT = 3001 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/api/notes', (req, res) => {
    const oldNote = JSON.parse(fs.readFileSync('./db/db.json'));
    res.json(oldNote)
})

app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;

    const oldNote = JSON.parse(fs.readFileSync('./db/db.json'));

    if (req.body) {
        const newNote = {
        title,
        text,
        note_id: uuid()
    }
    oldNote.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(oldNote, null, 2));
    } 
     else{
        console.log(err)
        }
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});



app.listen(PORT, () => {
    console.log('Now listening')
});