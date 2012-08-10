/*jslint node: true, indent: 4, maxlen: 80 */
"use strict";

/**
 * envy-test.js
 *
 * Behaviour tests for the main functionality. This tests use the 
 * ./test/test-config.json configuraton file.
 */
var vows = require("vows"),
    assert = require("assert");

vows.describe("Loading a configuration file").addBatch({
    "when the NODE_ENV property hasn't been defined": {
        topic:
            function () {
                return require("../envy").load("./test/test-config");
            },
        "the properties are retrieved from the default environment":
            function (config) {
                assert.equal(config.port, 3000);
                assert.equal(config.database.host, "localhost");
                assert.equal(config.database.name, "dev-app");
            }
    }
}).addBatch({
    "when the NODE_ENV has been set to 'production'": {
        topic:
            function () {
                process.env.NODE_ENV = "production";
                return require("../envy").load("./test/test-config");
            },
        "the non overloaded properties maintain their value":
            function (config) {
                assert.equal(config.port, 3000);
                assert.equal(config.database.host, "localhost");
            },
        "the overloaded properties are overloaded correctly":
            function (config) {
                assert.equal(config.database.name, "prod-app");
            }
    }
}).exportTo(module);

