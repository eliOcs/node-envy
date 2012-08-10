/*jslint node: true, indent: 4, maxlen: 80 */
"use strict";

// envy.js
// Contains all the module logic.

var envy = exports;

// Load the .json file containing the 
envy.load = function (filename) {

    // filenames are relative to the execution path
    var config = require(process.env.PWD + '/' + filename);

    // load default environment
    envy.config = config[config.environment];

    // Overwrite properties
    if (process.env.NODE_ENV && config[process.env.NODE_ENV]) {
        Object.defineProperties(envy.config, config[process.env.NODE_ENV]);
    }

};

// Load the default configuration file if it exists
try {
    envy.load('config');
} catch (e) {
    // Ignore failure when loading default configuration file
}
