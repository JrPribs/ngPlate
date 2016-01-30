'use strict';

module.exports = function(app) {

    // route to handle all angular requests
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });

};
