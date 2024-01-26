const express = require("express");
const dotenv = require("dotenv");
const moment = require("moment");

// Load the .env file
dotenv.config();

const app = express();
const morgan = require("morgan");
const { red, blue, green, yellow, cyan, magenta, white, black, reset } = require("./utils/color.js");

// log all morgan logs to a file
const { open, createWriteStream } = require('fs');


// create the file access.log in /logs/
open(__dirname + '/logs/access.log', 'w', (err, file) => {
    if (err) {
        console.log(err);
    }
});

morgan.token('date', (req, res, format) => {
    return moment().format('ddd, DD MMM YYYY HH:mm:ss ZZ'); // Set to the systems timezone (hopefully)
  });

// create a write stream (in append mode)
const accessLogStream = createWriteStream(__dirname + '/logs/access.log', { flags: 'a' });
// Yellow is info, green is religated to status codes
app.use(morgan(`:date | :method :url | :req[CF-connecting-ip] - :status - :response-time ms | :req[cf-ipcountry]`, { stream: accessLogStream }));

// Now print it to console w colors

app.use(morgan(`${blue}:date[web]${reset} | :method :url | :req[CF-connecting-ip] - ${yellow}(':status')} - :response-time ms${reset} | :req[cf-ipcountry]`));

// Paths to define for later use idfk
const css = express.static('/src/css');
const js =  express.static('/src/js');
const img = express.static('/src/img');

// Express settings
const port =
  process.env.PORT || 80

const status = process.env.STATUS || 'DEVELOPMENT';

if (status == 'DEVELOPMENT') {
    console.log('Running in development mode.');
}
if (status == 'PRODUCTION') {
    // TODO: Add production settings & admin panel
}

// serve all files in the css, js, and img directories
app.use('/css', express.static(__dirname + '/src/css'));
app.use('/js', express.static(__dirname + '/src/js'));
app.use('/img', express.static(__dirname + '/src/img'));

// Express routes
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/mrs-gaines', function(req, res) {
    res.sendFile(__dirname + '/views/mrs-gaines.html');
})

app.get('/status', function(req, res) {
    // send user to status.microwavebot.com
    res.redirect(301, 'https://status.microwavebot.com');
})


// Will move errors to a router later on
app.use(function(req, res, next) {
    res.status(404).sendFile(__dirname + '/views/errors/404.html');
});

app.use(function(req, res, next) {
    res.status(403).sendFile(__dirname + '/views/errors/403.html');
})

// Linux only, this also presumes you have sudo perms
const os = require('os');
const { exec } = require('child_process');
if (os.platform() === 'linux') {
    exec(`fuser -k ${port}/tcp`, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
        }
    })
} else {
    console.log('This feature is only available on Linux.');
}


// start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
