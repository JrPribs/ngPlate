'use strict';

var configs= {
    app: {
        title: 'ngPlate'
    },
    assets: {
        server: {},
        client: {}
    },
    db: {
        url: 'mongodb://localhost/ngPlate'
    },
    liveReload: false,
    port: process.env.PORT || 1337,
    server: {
        routes: ['apps/node_modules/*/server/routes/**/*.js', 'apps/*/server/routes/**/*.js']
    }
};

module.exports = configs;
