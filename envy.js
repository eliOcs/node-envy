// envy.js

var envy = module.exports;

// Load the .json file containing the 
envy.load = function(filename) {

	var config = require(filename);

	// load default environment
	envy.config = config[config.environment];
	
	// Overwrite properties
	if (process.env.NODE_ENV && config[process.env.NODE_ENV]) {
		for (var property in config[process.env.NODE_ENV]) {
			envy.config[property] = config[process.env.NODE_ENV][property];
		}
	}

};

envy.load('./config.json');
