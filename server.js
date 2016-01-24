'use strict';

process.env.NODE_CONFIG_DIR = process.cwd() + '/config/env/';
process.env.NODE_ENV = process.env.NODE_ENV || 'localhost-development';

var config = require('config');
var glob = require('glob');

// Register Babel Require Node Transpiler
require('babel-core/register')({
    only: /apps\/(.*\/(server|config)\/|node_modules\/.*)/
});

// Init Application
require('./config/application')();

if (config.get('liveReload')) {
    console.log('LiveReload enabled');
    var server = require('livereload').createServer({exts: ['scss']});
    server.watch(glob.sync('app/*/client'));
}
