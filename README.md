# ENVy

Handle your project environment properties from a simple .json file. Determine
 multiple environments and inherit properties between them.

## Installation

To install simply use the node package manager (NPM):

    [sudo] npm install envy

## Motivation

There is no standard way of managing environment properties per project in 
node. With envy you can easily meet this need.

## Typical use case 

### Define your configuration file

Create a .json file on your project root (where the package.json is located), 
for example:

    {
      "environment": "development",

      "development": {
        "test": "Development property"
      },

      "production": {
        "test": "Production property"
      }
    }

### Use your properties in your program

When you `require` the envy module it will try to load the default 
configuration file at: `./config.json`.

    var config = require('envy').config;

    console.log(config.test);

### Execute your application

Executing your application without setting the `NODE_ENV` environment 
variable will execute the program using the default properties in this case 
the `"development"` set will be selected.

    $> node your-app.js
    $> Development property
    $>

If you want to select another environment you will need to set the 
`NODE_ENV` environment variable:

    $> NODE_ENV=production node your-app.js
    $> Production property
    $>

## File format

The file defines what is your default environment from which all other 
environments will inherit their properties.

In the following example the `"development"` environment will be selected 
by default. _Selecting an environment in your configuration file will also make
 its properties to be inherited in the other environments._  
Continuing with the example, the `"production"` environment will also be 
configured to use the port `3000`, but its database URL will be 
`"mongodb://localhost/prod-app"` instead of 
`"mongodb://localhost/dev-app"`.

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

## API

### envy.load(filename)

Loads into `envy.config` the properties defined on the provided file.  
If the `NODE_ENV` environment variable hasn't been defined then the 
selected set of properties will be defined by the `"environment"` property
 of the .json file.  
The indicated filenames are relative to the execution path: 
`process.env.PWD`.

## Future features

We plan on extending the current features and include:

- Reload configuration files when they are modified.

