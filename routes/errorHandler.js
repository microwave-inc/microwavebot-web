const express = require('express');

const router = express.Router();

// For now only 404 and 403 stuff will be handled

// HTTP codes (returns HTML & JSON if calls for it)

router.get('/404', function(req, res, next) {
    // If the client wants JSON
    if (req.accepts('application/json')) {
        res.setHeader({ name: 'Content-Type', value: 'application/json' })
        res.status(404).json({ error: 'Not found', code: 404 });
        return;
    } else {
        res.status(404).sendFile(__dirname + '/views/errors/404.html');
    }
});

router.get('/403', function(req, res, next) {
    // If the client wants JSON
    if (req.accepts('application/json')) {
        res.setHeader({ name: 'Content-Type', value: 'application/json' })
        res.status(403).json({ error: 'Forbidden', code: 403 });
        return;
    } else {
        res.status(403).sendFile(__dirname + '/views/errors/403.html');
    }
});

module.exports = router;