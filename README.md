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

Create a .json file on your project root (where the package.json is located) 
this file is normally named `config.json`, for example:

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

The envy module is very easy to use, it only has function that loads the 
configuration file.
Calling the `load` function with no parameters will try to load `./config.json`:

    var config = require("envy").load();

If your configuration file is named differently you can indicate it, remember 
file paths are relative to your project root and the file extension may be 
omitted:

    var config = require("envy").load("./some-dir/filename");

or:

    var config = require("envy").load("./some-dir/filename.json");

### Execute your application

Imagine we have the following node application:

    var config = require("envy").load("./some-dir/filename.json");
    console.log(config.test);

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

Loads the properties defined on the provided file and returns the an object with
 the properties.  
If the `NODE_ENV` environment variable hasn"t been defined then the 
selected set of properties will be defined by the `"environment"` property
 of the .json file.  

* If no filename is provided, `config.json` will be loaded
* The filename is relative to the execution path: `process.env.PWD`
* The file extension can be omitted
