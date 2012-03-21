// envy.js

var envy = exports;

// Load the .json file containing the 
envy.load = function(filename) {

	// filenames are relative to the execution path
	var config = require(process.env.PWD + '/' + filename);

	// load default environment
	envy.config = config[config.environment];

	// Overwrite properties
	if (process.env.NODE_ENV && config[process.env.NODE_ENV]) {
		for (var property in config[process.env.NODE_ENV]) {
			envy.config[property] = config[process.env.NODE_ENV][property];
		}
	}

};

// Load the default configuration file if it exists
try {
	envy.load('./config');
} catch (e) {
	// Ignore failure when loading default configuration file
}
