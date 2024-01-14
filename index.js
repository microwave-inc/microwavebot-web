const express = require("express");

const app = express();

// Paths to define for later use idfk
const css = express.static('/src/css');
const js =  express.static('/src/js');
const img = express.static('/src/img');

// Express settings
const port =
  /* Generate random port but if and ENV exists set it to that */ process.env
    .PORT || 80;

// serve all files in the css, js, and img directories
app.use('/css', express.static(__dirname + '/src/css'));
app.use('/js', express.static(__dirname + '/src/js'));
app.use('/img', express.static(__dirname + '/src/img'));

// Express routes
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})