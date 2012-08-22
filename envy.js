/*jslint node: true, indent: 4, maxlen: 80 */
"use strict";

/**
 * ENVy
 *
 * Handle your project environment properties from a simple .json file. 
 * Determine multiple environments and inherit properties between them.
 */
var envy = exports,

    /**
     * Checks for Object instances.
     */
    isObject = function (object) {
        return Object.prototype.toString.call(object) === "[object Object]";
    },

    /**
     * Deep copies the properties of the source object into the destination 
     * object.
     */
    deepCopy = function (destination, source) {
        Object.keys(source).forEach(function (property) {
            if (destination[property] && isObject(destination[property])) {
                deepCopy(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        });
    };

/**
 * Loads the configuration .json file with the provided filename and returns an 
 * object with the environment properties.
 * If no filename is providen then ./config.json will be loaded.
 */
envy.load = function (filename) {

    // filenames are relative to the execution path
    var configFile = require(process.cwd() + "/" + (filename || "config")),
        config = configFile[configFile.environment];

    // Overwrite default configuration if the NODE_ENV environment variable is
    // defined
    if (process.env.NODE_ENV && configFile[process.env.NODE_ENV]) {
        deepCopy(config, configFile[process.env.NODE_ENV]);
    }

    return config;

};

/**
 * DEPRECATED
 *
 * envy.config can be replaced with envy.load(). Therefore it will 
 * be deleted.
 */
// Load the default configuration file if it exists
try {
    envy.config = envy.load();
} catch (e) {
    // Ignore failure when loading default configuration file
}
