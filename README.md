# ENVy

Handle your project environment properties from a simple .json file. Determine
 multiple environment and inherit properties between environments.

## Installation

To install simply use the node package manager (NPM):

```
[sudo] npm install envy
```

## Motivation

There is no standard way of managing in node environment properties per 
project. With envy you can easily cover this necessity for projects that have 
to handle many environments.

## Usage

### File format

The file defines what is your default environment from which all other 
environments will inherit their properties.

In the following example the ```"development"``` environment will be selected 
by default. _Selecting an environment in your configuration file will also make
 its properties to be inherited in the other environments._  
Continuing with the example, the ```"production"``` environment will also be 
configured to use the port ```3000```, but its database url will be 
```"mongodb://localhost/prod-app"``` instead of 
```"mongodb://localhost/dev-app"```.

```json
{
	"environment": "development",

	"development": {
		"port": 3000,
		"database": {
			"url": "mongodb://localhost/dev-app"
		}
	},

	"production": {
		"database": {
			"url": "mongodb://localhost/prod-app"
		}
	}
}
```

### Using it in your program

When you ```require``` the envy module it will try to load the default configuration file: ```./config.json```.

``` js
var envy = require('envy');

envy.config.your.properties;
```

If you want to select an environment you will need to set the ```NODE_ENV``` 
environment variable:

```NODE_ENV=production node your-app.js```

## Future features

We plan on extending the current features and include:

	- Reload configuration files when modified.
