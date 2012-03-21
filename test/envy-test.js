// envy-test.js
// Behaviour tests for the main functionality. This tests use the 
// ./test/test-config.json file.

var vows = require('vows'),
		assert = require('assert');

vows.describe('Loading a configuration file').addBatch({
	'when the NODE_ENV property hasn\'t been defined': {
		topic:
			function() {
				var envy = require('../envy');
				envy.load('./test/test-config');

				return envy.config;
			},
	'the properties are retrieved from the default environment':
		function (config) {
			assert.equal(config.port, 3000);
			assert.equal(config.database.url, 'mongodb://localhost/dev-app');
		}
	}
}).addBatch({
	'when the NODE_ENV has been set to "production"': {
		topic:
			function() {
				process.env.NODE_ENV = 'production';
				var envy = require('../envy');
				envy.load('./test/test-config');

				return envy.config;
			},
	'the non overloaded properties maintain their value':
		function (config) {
			assert.equal(config.port, 3000);
		},
	'the overloaded properties are overloaded correctly':
		function (config) {
			assert.equal(config.database.url, 'mongodb://localhost/prod-app');
		}
	}
}).exportTo(module);

