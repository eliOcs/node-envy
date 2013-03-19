/*jslint node: true, indent: 4, maxlen: 80 */
"use strict";

/**
 * ENVy
 *
 * Handle your project environment properties from a simple .json file.
 * Determine multiple environments and inherit properties between them.
 */
var path = require("path"),
    envy = exports;

/**
 * Checks for Object instances.
 */
function isObject(object) {
    return Object.prototype.toString.call(object) === "[object Object]";
}

/**
 * Deep copies the properties of the source object into the destination
 * object.
 */
function deepCopy(destination, source) {
    Object.keys(source).forEach(function (property) {
        if (destination[property] && isObject(destination[property])) {
            deepCopy(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    });
}

/**
 * Loads the configuration .json file with the provided filename and returns an
 * object with the environment properties.
 * If no filename is providen then ./config.json will be loaded.
 */
envy.load = function (filename) {

    // filenames are relative to the execution path
    var configFile = require(path.join(process.cwd(), filename || "config")),
        config = configFile[configFile.environment];

    // Overwrite default configuration if the NODE_ENV environment variable is
    // defined
    if (process.env.NODE_ENV && configFile[process.env.NODE_ENV]) {
        deepCopy(config, configFile[process.env.NODE_ENV]);
    }

    return config;

};