// Website admin panel only accessible via whitelisted IP's
const express = require("express");
const route = express.Router();

route.get('/', function(req, res) {
    // if the user is not whitelisted, send them to the 404 page
    const whitelistRegex = /^192\.168\.1\.\d{1,3}$/;
    if (!whitelistRegex.test(req.ip) && req.ip !== process.env.WL_IP) {
        res.status(404).sendFile(__dirname + '/views/errors/403.html');
        return;
    }
    res.sendFile(__dirname + '/views/admin.html');
})
