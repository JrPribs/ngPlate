'use strict';

process.env.NODE_CONFIG_DIR = process.cwd() + '/config/env/';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./env/default');

module.exports = function() {

    // Init the express application
    var app = require('./express')();
    require('../app/server/sample.routes.js')(app);


    // Start the app by listening on <port>
    app.listen(config.port);

    // Logging initialization
    console.log('Application started on port ' + config.port);
};
