const express = require('express');
const path = require('path');
const db = require('./queries');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(path.resolve(__dirname, './client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html')); 
});

app.get('/links', db.getLinks);
app.post('/new', db.createLink);

app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}.`);
});
