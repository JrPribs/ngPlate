'use strict';

var mongoose = require('mongoose');

// define our model
module.exports = mongoose.model('sampleModel', {
    name: {type: String, default: 'SAMPLE NAME'}
});
