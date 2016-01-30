'use strict';

/**
 * Module dependencies.
 */
var express        = require('express');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

module.exports = function() {
    // Initialize express app
    var app = express();

    // config files
    var config = require('./env/default');

    // connect to our mongoDB database
    // (uncomment after you enter in your own credentials in config/db.js)
    // mongoose.connect(config.db.url);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(express.static(__dirname + '/'));

    // Return Express server instance
    return app;
};
