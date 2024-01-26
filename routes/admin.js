// Website admin panel only accessible via whitelisted IP's
const express = require("express");
const route = express.Router();

function login(req, res, next) {
    if (req.session.admin) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}

route.get('/', function(req, res) {
    // if the user is not whitelisted, send them to the 403 page
    const whitelistRegex = /^192\.168\.1\.\d{1,3}$/;
    if (!whitelistRegex.test(req.ip) && req.ip !== process.env.WL_IP) {
        res.status(403).sendFile(__dirname + '/views/errors/403.html');
        return;
    }
    res.sendFile(__dirname + '/views/admin/index.html');
})

route.get('/login', function(req, res) {
    res.sendFile(__dirname + '/views/admin/login.html');

    // Code to get password and user from the fields
    const username = req.body.username;
    const password = req.body.password;

    // Pull from the env
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // If the username and password match, set the session to true
    if (username === adminUsername && password === adminPassword) {
        req.session.admin = true;
        // Set it to expire after 30m
        req.session.cookie.maxAge = 1800000;
    }

    // Redirect to the admin panel
    res.redirect('/admin');
})
