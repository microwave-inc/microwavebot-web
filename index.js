const express = require("express");
const dotenv = require("dotenv");
const moment = require("moment");
const https = require("https");
const fs = require('fs')

// Load the .env file
dotenv.config();

const app = express();
const morgan = require("morgan");
const {
  red,
  blue,
  green,
  yellow,
  cyan,
  magenta,
  white,
  black,
  reset,
} = require("./utils/color.js");

function forceHTTPS(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https' && req.headers['x-forwarded-proto'] !== undefined) {
    return res.redirect(301, 'https://' + req.headers.host + req.url);
  }
  return next();
}

app.use(forceHTTPS);

// log all morgan logs to a file
const { open, createWriteStream } = require("fs");

let todays_date = moment().format("DD-MM-YYYY");

// create the file access.log in /logs/
open(__dirname + `/logs/${todays_date}.log`, "w", (err, file) => {
  if (err) {
    console.log(err);
  }
  // IF file does exist, do nothing
  if (file) {
    console.log(`${yellow}Log file exists, skipping${reset}`);
  }
  console.log(`${green}Log file created${reset}`);
});

morgan.token("date", (req, res, format) => {
  return moment().format("ddd, DD MMM YYYY HH:mm:ss ZZ"); // Set to the systems timezone (hopefully)
});

// create a write stream (in append mode)
const accessLogStream = createWriteStream(
  __dirname + `/logs/${todays_date}.log`,
  { flags: "a" }
);
// Yellow is info, green is religated to status codes
app.use(
  morgan((tokens, req, res) => {
    let status = tokens.status(req, res);
    status = String(status).padEnd(3); // Pad status code to width of 3

    let method = tokens.method(req, res);
    method = String(method).padEnd(2); // Pad method to width of 7

    let url = tokens.url(req, res);
    url = String(url).padEnd(20); // Pad url to width of 40

    let ip = req.headers['CF-connecting-ip'] || req.socket.remoteAddress;
    ip = String(ip).replace('::ffff:', '').padEnd(15);

    let countries = require('./data/countries.json')

    // Get the country abbreviation from the IP
    let countriesabbv = req.headers['cf-ipcountry'] || '';

    // Check the json file for the country abbv in the "code" var
    // example: {"name": "Zimbabwe", "code": "ZW"}

    let actualcountry = countries.find((country) => country.code === countriesabbv);

    let ipCountry = actualcountry ? actualcountry.name : '';

    return tokens.date(req, res) + " | [" + method + "] " + url + " | " + ip + " - Status: " + status + " | " + ipCountry;
  }, { stream: accessLogStream })
);

// Now print it to console w colors
app.use(
  morgan((tokens, req, res) => {
    let status = tokens.status(req, res);
    status = String(status).padEnd(3); // Pad status code to width of 3

    let method = tokens.method(req, res);
    method = String(method).padEnd(2); // Pad method to width of 7

    let url = tokens.url(req, res);
    url = String(url).padEnd(20); // Pad url to width of 40

    let ip = req.headers['CF-connecting-ip'] || req.socket.remoteAddress;
    ip = String(ip).replace('::ffff:', '').padEnd(15);

    let countries = require('./data/countries.json')

    // Get the country abbreviation from the IP
    let countriesabbv = req.headers['cf-ipcountry'] || '';

    // Check the json file for the country abbv in the "code" var
    // example: {"name": "Zimbabwe", "code": "ZW"}

    let actualcountry = countries.find((country) => country.code === countriesabbv);

    let ipCountry = actualcountry ? actualcountry.name : ''.padEnd(5);

    return `${blue}${tokens.date(req, res)}${reset} | [${yellow}${method}${reset}] ${url} | ${ip} - Status: ${yellow}${status}${reset} | ${ipCountry}`;
  })
);

// Paths to define for later use idfk
const css = express.static("/src/css");
const js = express.static("/src/js");
const img = express.static("/src/img");

// Express settings
const port = process.env.PORT || 80;

const status = process.env.STATUS || "DEVELOPMENT";

if (status == "DEVELOPMENT") {
  console.log(`${yellow}Running in development mode.${reset}`);
}
if (status == "PRODUCTION") {
  // TODO: Add production settings & admin panel
}

// serve all files in the css, js, and img directories
app.use("/css", express.static(__dirname + "/src/css"));
app.use("/js", express.static(__dirname + "/src/js"));
app.use("/img", express.static(__dirname + "/src/img"));

// Express routes
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/status", function (req, res) {
  // send user to status.microwavebot.com
  res.redirect(301, "https://status.microwavebot.com");
});

app.get("/robots.txt", function (req, res) {
  res.sendFile(__dirname + "/robots.txt"); // Correctly does the Robotx.txt
});
// Will move errors to a router later on
app.use(function (req, res, next) {
  res.status(404).sendFile(__dirname + "/views/errors/404.html");
});

app.use(function (req, res, next) {
  res.status(403).sendFile(__dirname + "/views/errors/403.html");
});

// Linux only, this also presumes you have sudo perms
const os = require("os");
const { exec } = require("child_process");
if (os.platform() === "linux") {
  exec(`fuser -k ${port}/tcp`);
} else {
  console.log("This feature is only available on Linux.");
}

if (fs.existsSync('./certs/privkey.pem') && fs.existsSync('./certs/fullchain.pem')) {
  console.log(`${green}SSL Certificates found, starting HTTPS server${reset}`);
  const options = {
    key: fs.readFileSync('./certs/privkey.pem', 'utf8'),
    cert: fs.readFileSync('./certs/fullchain.pem', 'utf8')
  };
  
  https.createServer(options, app).listen(port, () => {
    console.log(`${green}Listening on port ${port}${reset}`);
  });
}

// Now on 80
app.listen(80, () => {
  console.log(`${green}Listening on port 80${reset}`);
});