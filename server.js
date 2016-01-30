'use strict';

process.env.NODE_CONFIG_DIR = process.cwd() + '/config/env/';
process.env.NODE_ENV = process.env.NODE_ENV || 'localhost';

var glob = require('glob');
var config = require('./config/env/default');

// Register Babel Require Node Transpiler
require('babel-core/register')({
    only: /app\/(.*\/(server|config)\/|node_modules\/.*)/
});

// Init Application
require('./config/application')();

if (config.liveReload) {
    console.log('LiveReload enabled');
    var server = require('livereload').createServer({exts: ['scss']});
    server.watch(glob.sync('app/*/client'));
}
