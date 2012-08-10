/*jslint node: true, indent: 4, maxlen: 80 */
"use strict";

// envy.js
// Contains all the module logic.

var envy = exports;

// Load the .json file containing the 
envy.load = function (filename) {

    // filenames are relative to the execution path
    var configFile = require(process.env.PWD + '/' + filename),
        defaultConfig = configFile[configFile.environment];

    // Overwrite properties
    if (process.env.NODE_ENV && configFile[process.env.NODE_ENV]) {
        var selectedConfig = configFile[process.env.NODE_ENV];
        for (var property in selectedConfig) {
            defaultConfig[property] = selectedConfig[property];
        }
    }

    return defaultConfig;

};

// Load the default configuration file if it exists
try {
    envy.config = envy.load('config');
} catch (e) {
    // Ignore failure when loading default configuration file
}
